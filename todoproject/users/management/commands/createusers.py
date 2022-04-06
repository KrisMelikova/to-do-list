from django.core.management.base import BaseCommand
from users.models import PortalUser


class Command(BaseCommand):
    help = 'Command that creates superuser and some users'

    def adding_args(self, parser):
        parser.adding_args('count', type=int)

    def handle(self, *args, **kwargs):
        PortalUser.objects.all().delete()

        count = kwargs.get('count', 3)

        PortalUser.objects.create_superuser('Anna', 'anna@karenina.mail.ru', '1234')
        PortalUser.objects.create_superuser('Ivan', 'ivan@karenin.mail.ru', '567')

        for i in range(count):
            PortalUser.objects.create_user(f'User{i}', f'user{i}@test.ru', '1234')

        created_users_count = PortalUser.objects.all().count()

        print(f'{created_users_count} users are created!')
