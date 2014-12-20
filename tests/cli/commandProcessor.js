/**
 * Created by Maxim Vyhovskyi on 20.12.14.
 */

var expect = require('chai').expect;
var CommandProcessor = require('../../core/cli/CommandProcessor');
var ResourceTree = require('../../core/resourceTree');

describe('Command processor',function(){
  var processor = null;
  beforeEach(function(){
    processor = new CommandProcessor(new ResourceTree());
  });
  describe('current context',function(){
    //it('should be presented as path string with root slash',function(){
    //  var context = processor.getCurrentContext();
    //  expect(context).to.be.a('string');
    //  expect(context).to.be.equal('/apps/sso');
    //});
  })
});