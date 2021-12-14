# https://github.com/envygeeks/jekyll-docker did not work
FROM ruby:3
RUN gem install jekyll jekyll-relative-links webrick 
WORKDIR /usr/src/app
COPY . .

EXPOSE 4000
CMD ["jekyll","serve","--incremental"]
