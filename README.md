# hitontology.eu

This is the website for HITO – A Health IT Ontology for systematically describing application systems and software products in health IT.
It is a fork of the [Hyde layout](https://github.com/poole/hyde), which itself is based on Jekyll, a static site generator.

## Setup
Clone this repository , e.g. `git clone git@github.com:hitontology/hitontology.eu.git`

1. Install Ruby
2. Install Bundler
3. Use Bundler to install the dependencies

Alternatively, you can use the Dockerfile.

### Example for Arch Linux

    $ sudo pacman -S ruby

Add the following to your environment configuration file, such as `.profile` or `.zshrc` and reload (`source ~/.zshrc`) it:

    export GEM_HOME="$(ruby -e 'puts Gem.user_dir')"
    export PATH="$PATH:$GEM_HOME/bin"

Use bundler with the provided Gemfile:

    $ gem install bundler
    $ bundle install

However that resulted in the error `Bundler::GemNotFound: Could not find jekyll-4.2.1.gem for installation` in testing on one machine.

### Example for MacOS (with Homebrew)

Install Ruby:

    $ brew install ruby

Add the brew ruby path to your shell configuration.
If you're using Zsh:

    $ echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.zshrc

Install bundler and the gems:

    $ gem install --user-install bundler
    $ bundle install

### Using Docker
If you cannot or do not want to install Ruby and the gems on your system, you can also use the Dockerfile.
Build the image in the project directory using `docker build -t hitontology.eu .`.

## Preview
Switch to the `master` branch and run `bundle exec jekyll serve --incremental`, respectively `docker run --rm --network="host" hitontology.eu`.
Check if everyone looks normal.

## Build
The GitHub workflow in `.github/workflows/deploy.yml` automatically builds the master branch and deploys it on the static branch.
To build locally, run `jekyll build (--incremental)`, respectively `docker run --rm -it --volume="$PWD:/usr/src/app" -it hitontology.eu jekyll build`.
This will put the static HTML content into the `_site` folder.

### Deploy
We serve the content of the static branch at the official HITO website <https://hitontology.eu>.
The static branch is also automatically served using GitHub pages at <https://hitontology.github.io/hitontology.eu/>.

## Integration of the Faceted Search
If you publish it for the first time, go into the `hitontology.eu` directory and perform `git clone git@github.com:hitontology/facetedbrowsing.git search`. Then follow the installation instructions for the search.
