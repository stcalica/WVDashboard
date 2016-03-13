FROM postgres:latest

COPY . /fixtures
WORKDIR /fixtures
RUN chmod +x /fixture/setup.sh
RUN /fixtures/setup.sh
