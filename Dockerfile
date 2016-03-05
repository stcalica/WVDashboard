FROM orchardup/python:2.7

ADD . /PRODUCTION

RUN pip install --user -r ./PRODUCTION/requirements.txt

CMD python ./PRODUCTION/dashboard/manage.py runserver
