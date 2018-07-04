//Variables
var loc = 'terminal'
var prompt = 'guest@' + loc + ':~# '
let mode = ''
var pwd = '/'
var pwdStack = []
pwdStack.push('/')
var searchTerm = []

modes = {
  0: 'terminal',
  1: 'csgo',
  2: 'nba',
  3: 'afl'
}

//Functions
//The ascii font is called Slant
greetings = (term) => {
  term.echo("Program name goes here in a cool font", {
    raw: true
  });
}

mainMenu = (term) => {
  term.echo("</br>-- Main Menu --</br></br>1: CS:GO</br>2: NBA</br>3: AFL</br></br>", {
    raw: true
  });
}

help = (term) => {
  term.echo("<div></br><span class='heading'>List of Commands</span><div class='menu-items'></br>...</br>...</br>...</br>...</br></br></div></div>", {
    raw: true
  })
}

setPrompt = (term) => {
  term.set_prompt('guest@' + loc + ':~# ');
}

setPwd = (command) => {
  //Not yet implemented
}

splitCommand = (command) => {
  searchTerm = command.split(" ")
  console.log(searchTerm)
}

commandNotFound = (command, term) => {
  term.echo('<span style="color: red">Command not recognized</span>', {
    raw: true
  })
}

//All terminal functions go on in here
var terminal = $('#terminal').terminal(function(command, term) {
  if (command !== '') {
    try {
      //Stuff to do goes in here
      if (command == 'help') {
        help(term)
      }

      if (command == 'home') {
        mode = ''
        setPrompt(term)
        mainMenu(term)
      }

      if (command == 'pwd') {
        term.echo(pwd)
      }

      if (mode == '' && command != 'home') {
        //Select the menu items
        if(command == 'csgo' || command == '1') {
          term.echo("CSGO STUFF GOES IN HERE");
          mode = 1;
        } else if (command == 'nba' || command == '2') {
          mode = 2;
          term.echo("1: Schedule (Upcoming games)</br>2: Standings</br>3: Scores", {
            raw: true
          });
        } else if (command == 'afl' || command == '3') {
          term.echo("AFL STUFF GOES IN HERE");
          mode = 3;
        } else {
          //If the command does not match any menu items
          commandNotFound(command, term)
        }
      }

      //Set Mode Information
      if (mode != '' && command != 'home') {
        if (mode == 1) {
          //CSGO MODE - Options for scores, streaming etc.
          loc = modes[mode];
          setPrompt(term)
        } else if (mode == 2) {
          //NBA MODE - Options for scores, streaming etc.
          loc = modes[mode];
          setPrompt(term)

          splitCommand(command)

          if (searchTerm[0] != 'nba') {
            if (searchTerm[0] == 'schedule') {
              term.echo('Print Schedule')
            } else if (searchTerm[0] == 'standings') {
              term.echo('Print Standings')
            } else if (searchTerm[0] == 'scores') {
              term.echo('Print Scores')
            } else {
              commandNotFound(command, term)
            }
          }
        } else if (mode == 3) {
          //AFL MODE - Options for scores, streaming etc.
          loc = modes[mode];
          setPrompt(term)
        }
      } else if (command == 'home') {
        loc = 'terminal';
        setPrompt(term)
      } else {
        //If the command does not match any menu items
        commandNotFound(command, term)
      }
    } catch(e) {
      term.error(new String(e));
    } finally {
      term.echo('</br>', {
        raw: true
      });
    }
  } else
    term.echo('');
    term.echo('</br>', {
      raw: true
    });
}, {
    greetings: null,
    height: $(window).height(),
    width: $(window).width(),
    prompt: prompt,
    onInit: function(term) {
      greetings(term)
      help(term)
      mainMenu(term)
    }
});
