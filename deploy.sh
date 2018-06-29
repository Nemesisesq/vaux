#!/usr/bin/env bash

#### 2. Script Setup ####
# It's useful to exit the bash script when a command exits with a non-zero status
# as the following commands must be run successfully in sequence for expected results.
set -e # exit entire script when command exits with non-zero status

# [Optional] Login to Expo using username & password
# You may or may not need to do this depending on your setup.
# Note the $EXPO_USERNAME and $EXPO_PASSWORD env variables
# exp login -u $EXPO_USERNAME -p $EXPO_PASSWORD --non-interactive
yarn install

echo "What environemnt are you deploying to"

read -p "staging | production --- " envvar

echo "what version number are you deploying"

read -p "e.g. 1.0 --- " versionvar


#### 3. Publish to Expo ####
# Publish `envvar and versionvar` release
exp publish --release-channel ${envvar}-${versionvar} --non-interactive

#### 4. Building Android Standalone App ####
# Start building standalone android build using `production` release channel

exp build:android --release-channel ${envvar}-${versionvar} --non-interactive --no-publish

# Download the artifact to current directory as `app.apk`
curl -o app.apk "$(exp url:apk --non-interactive)"


echo "What android track are you targeting"

read -p "beta | production" androidtrack

#### 5. Submit and publish standalone Android app to the Google Play Store ####
# Use fastlane to upload your current standalone android build
# Customize this to fit your needs. Take note of env variables.
# Check out https://docs.fastlane.tools for more info.
fastlane supply --track ${androidtrack} --json_key '/Users/nem/google_play/api-6952268991288410126-156533-445d22b8bbec.json' --package_name "com.vauxiliary.expo" --apk "app.apk" --skip_upload_metadata --skip_upload_images --skip_upload_screenshots


#### 6. Building iOS Standalone App ####
# Start building standalone android build using `production` release channel
exp build:ios --release-channel ${envvar}-${versionvar} --non-interactive --no-publish

# Download the artifact to current directory as `app.ipa`
curl -o app.ipa "$(exp url:ipa --non-interactive)"

#### 7. Submit standalone iOS app to iTunes Connect ####
# Make sure the following env variables are set
# export DELIVER_USERNAME=<your-itunes-connect-email>
# export DELIVER_PASSWORD=<your-itunes-connect-password>

read -p "itunes username --- " username

read -p "itunes password --- " password

export  $DELIVER_USERNAME=${username}
export  $DELIVER_PASSWORD=${password}

# Use fastlane to upload your current standalone iOS build to itc
fastlane deliver --verbose --ipa "app.ipa" --skip_screenshots --skip_metadata

#### Misc ####
# [Optional] You may or may not need to do this depending on your setup.
# exp logout