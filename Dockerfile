FROM ruby:3
WORKDIR /src
RUN gem install bundler
COPY Gemfile .
COPY Gemfile.lock .
RUN bundle install
COPY . .
RUN bundle exec jekyll build

FROM pierrezemb/gostatic
WORKDIR /srv/http
COPY --from=0 /src/_site .
