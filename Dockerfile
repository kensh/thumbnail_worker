FROM centos:7.5.1804

ENV APP_HOME=/opt/thumbnail/
WORKDIR $APP_HOME

RUN yum -y install ImageMagick \
 && curl -sL https://rpm.nodesource.com/setup_11.x | bash - \
 && yum -y install nodejs

COPY ./*.js ./*.json $APP_HOME
RUN npm install

CMD ["node","app.js"]



