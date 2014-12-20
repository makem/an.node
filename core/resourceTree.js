/**
 * Created by Maxim Vyhovskyi on 20.12.14.
 */

function ResourceRoot (name, parent) {
  var _name = name;
  var _parent = parent;
  var _child = [];
  /**
   * Add Catalog as a child
   * @param name
   * @returns {ResourceRoot}
   */
  this.addCatalog = function (name) {
    var catalog = new ResourceRoot (name, this);
    _child.push (catalog);
    return catalog;
  };
  /**
   *
   * @returns {*}
   */
  this.getParentItem = function () {
    return _parent;
  };
  /**
   *
   * @returns {Array}
   */
  this.getChildItems = function () {
    return _child;
  };
  /**
   *
   * @param name
   * @returns {*}
   */
  this.getChildItem = function (name) {
    var items = _child.filter (function (i) {
      return i.getName () == name;
    });
    if (items.length) {
      return items[0];
    }
    return null;
  };
  /**
   *
   * @returns {*}
   */
  this.getName = function () {
    if (_name) {
      return _name;
    }
    return '/';
  };
  /**
   *
   */
  this.getPath = function () {
    if (_parent) {
      var parentPath = _parent.getPath ();
      return parentPath + (parentPath.length > 1 ? '/' : '') + this.getName ();
    }
    return this.getName ();
  };
  /**
   *
   * @param path
   */
  this.findItem = function (path) {
    var segments = path.split ('/');
    var incorrectPath = segments.length < 2 || segments[0].length > 0 || segments[1].length == 0;
    if(incorrectPath){
      throw Error ('Incorrect path ' + path);
    }
    segments.shift();
    var itemName = segments[0];
    var item = this.getChildItem(itemName);
    if(item){
      segments.shift();
      if(segments.length){
        return item.findItem('/'+segments.join('/'));
      }
      return item;
    }
    return null;
  }
}

/**
 *
 * @constructor
 */
function ResourceTree () {
  var _root = new ResourceRoot (null);
  var _apps = _root.addCatalog ('apps');
  var _security = _root.addCatalog ('security');

  this.addApplication = function (appDescription) {
    _apps.addCatalog (appDescription.name)
  };

  this.getRootItem = function () {
    return _root;
  };

  this.getAppRoot = function () {
    return _apps;
  };
  /**
   *
   * @param path
   */
  this.findItem = function (path) {
    return _root.findItem(path);
  }
}


module.exports = ResourceTree;