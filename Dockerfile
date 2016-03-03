FROM python2.7

ADD . /PRODUCTION

RUN pip install -u -r requirements.txt

CMD python ./dashboard/manage.py runserver
