# kursAngularJS


# Instalacja XAMPP

Uruchamianie aplikacji na serwerze aplikacyjnym

cd ~/Downloads
sudo su
sudo chmod 777 -R xampp-linux-x64-1.8.3-4-installer.run
./xampp-linux-x64-1.8.3-4-installer.run

Konfiguracja:

 - hosty:
$ cat /etc/hosts
127.0.0.1	kurs-angularjs

 - konfiguracja virtualnych hostów pod jakim adresem bedzie widoczna nasza aplikacja w '/opt/lampp/etc/extra/httpd-vhosts.conf':

<VirtualHost *:80>
    ServerAdmin webmaster@dummy-host2.example.com
    DocumentRoot "/home/tomek/Desktop/KURS_ANGULARJS/learning-app"
    ServerName dummy-host2.example.com
    ErrorLog "logs/dummy-host2.example.com-error_log"
    CustomLog "logs/dummy-host2.example.com-access_log" common
</VirtualHost>



# Edytor tekstowy: sublime-text 3 z wtyczka do AngularJS

## Instalacja sublime-text3 na ubuntu

sudo add-apt-repository -y ppa:webupd8team/sublime-text-3
sudo apt-get update; sudo apt-get install -y sublime-text-installer

## Emmet do podpowiadania skaldni html
- np.button.btn.btn-success[ng-click="aaaa"]{Wyczyść tablicę}

wybierz klawisz TAB

Available actions

    Expand Abbreviation – Tab or Ctrl+E
    Interactive “Expand Abbreviation” — Ctrl+Alt+Enter
    Match Tag Pair Outward – ⌃D (Mac) / Ctrl+, (PC)
    Match Tag Pair Inward – ⌃J / Shift+Ctrl+0
    Go to Matching Pair – ⇧⌃T / Ctrl+Alt+J
    Wrap With Abbreviation — ⌃W / Shift+Ctrl+G
    Go to Edit Point — Ctrl+Alt+→ or Ctrl+Alt+←
    Select Item – ⇧⌘. or ⇧⌘, / Shift+Ctrl+. or Shift+Ctrl+,
    Toggle Comment — ⇧⌥/ / Shift+Ctrl+/
    Split/Join Tag — ⇧⌘' / Shift+Ctrl+`
    Remove Tag – ⌘' / Shift+Ctrl+;
    Update Image Size — ⇧⌃I / Ctrl+U
    Evaluate Math Expression — ⇧⌘Y / Shift+Ctrl+Y
    Reflect CSS Value – ⇧⌘R / Shift+Ctrl+R
    Encode/Decode Image to data:URL – ⇧⌃D / Ctrl+'
    Rename Tag – ⇧⌘K / Shift+Ctrl+'



## Instalacja wtyczki dla angularjs:

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
