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

module.exports = CommandProcessor;