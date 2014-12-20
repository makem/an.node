/**
 * Created by Maxim Vyhovskyi on 20.12.14.
 */

function CommandProcessor(resourceTree){
  var _resourceTree = resourceTree;
  var _currentContext = '/';
  this.getCurrentContext =function(){
    return _currentContext;
  }

}

/**
 * Should have methods
 * 1. getCurrentContext()
 * 2. getPrompt()
 * 2. highlight(line)
 * 3. perform(line)
 *
 * Should have events
 * 1. contextChanged
 * 2. promptChanged
 * 3. textReceived
 * 4. highlightReceived
 *
 * @type {CommandProcessor}
 */
module.exports = CommandProcessor;