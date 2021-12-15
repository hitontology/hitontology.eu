# https://github.com/envygeeks/jekyll-docker did not work
FROM ruby:3
RUN gem install bundler
COPY Gemfile .
COPY Gemfile.lock .
RUN bundle install
WORKDIR /usr/src/app
COPY . .

EXPOSE 4000
CMD ["bundle","exec","jekyll","serve","--incremental"]
