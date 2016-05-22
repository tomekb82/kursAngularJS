# kursAngularJS


# Edytor tekstowy: sublime-text 3 z wtyczka do AngularJS

## Instalacja sublime-text3 na ubuntu

sudo add-apt-repository -y ppa:webupd8team/sublime-text-3
sudo apt-get update; sudo apt-get install -y sublime-text-installer

## Instalacja wtyczki:

    Download and install Sublime Text Editor from http://www.sublimetext.com/.
    Download Angular Sublime package (zip file) developed by the Angular-UI team from this page: https://github.com/angular-ui/AngularJS-sublime-package. This page consists of greater details on further customizing Sublime for AngularJS.
    Unzip and name the root package (angularjs-sublime-packager-master) as “AngularJS”. Make sure you have all the files within this package only.
    Copy AngularJS folder.
    Open Sublime Text Editor and paste the “AngularJS” folder by opening “Preferences > Browse Packages”
    Paste some of the following configuration (JSON format) by opening the “Preferences > Settings – User”. The file would look like the following:
// Settings in here override those in "Default/Preferences.sublime-settings", and

// are overridden in turn by file type specific settings.

{

"auto_complete_selector": "source - comment, meta.tag - punctuation.definition.tag.begin",

"auto_complete_triggers":

        [

            {

            "characters": "ng-controller=\"*",

            "selector": "punctuation.definition.string"

            }

        ]

}

    Close Sublime and open it again. And, try your AngularJS hello world program. You could check the preferences related to AngularJS and customize appropriately as shown in following screenshot.  After that, you're all set to code!
