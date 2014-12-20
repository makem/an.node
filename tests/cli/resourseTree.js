/**
 * Created by Maxim Vyhovskyi on 20.12.14.
 */

var expect = require('chai').expect;
var ResourceTree = require('../../core/ResourceTree');

function CreateTree(){
  var tree = new ResourceTree();
  tree.addApplication({name:'sso', module:'sso'});
  tree.addApplication({name:'users', module:'users'});
  return tree;
}

describe('Resource Tree',function(){
  describe('path',function(){
    var tree = CreateTree();
    var root = tree.getRootItem();
    var appRoot = tree.getAppRoot();

    it('should get root item',function(){
      expect(root).to.be.an('object');
      expect(root).to.contain.keys('getName');
      expect(root.getName()).to.equal('/');
    });
    it('should get all child items for the item specified',function(){
      var children = root.getChildItems();
      expect(children).to.have.length(2);
    });
    it('should get parent item for the item specified',function(){
      var firstChild = root.getChildItems()[0];
      var parent = firstChild.getParentItem();
      expect(parent).to.equal(root);
    });
    it('should provide client with app root',function(){
      expect(appRoot).to.be.an('object');
      expect(appRoot.getName()).to.equal('apps');
    });
    it('should find item by name specified',function(){
      var ssoApp = appRoot.getChildItem('sso');
      expect(ssoApp).to.be.an('object');
      expect(ssoApp.getName()).to.equal('sso');
      var unknownApp = appRoot.getChildItem('unknown');
      expect(unknownApp).to.be.null;
    });
    it('should get path to the item specified',function(){
      var apps = tree.getAppRoot();
      var ssoApp = apps.getChildItem('sso');
      var path = ssoApp.getPath();
      expect(path).to.be.a('string');
      expect(path).to.equal('/apps/sso');
    });
    it('should find item by path specified',function(){
      var ssoApp = tree.findItem('/apps/sso');
      expect(ssoApp).to.be.an('object');
      expect(ssoApp.getName()).to.equal('sso');
      var unknownApp = tree.findItem('/apps/sss');
      expect(unknownApp).to.be.null;
    });
  });
});