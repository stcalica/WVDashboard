FROM orchardup/python:2.7

ADD . /usr/app/src


RUN pip install --user -r /usr/app/src/requirements.txt

