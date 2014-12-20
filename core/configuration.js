/**
 * Created by Maxim Vyhovskyi on 02.12.14.
 */

var fs = require('fs');
var uuid = require ('uuid');
var crc32 = require ('buffer-crc32');
var util = require('util');
var path = require('path');
/**
 * Configures a new instance of core
 * Preserve previous setting in case instance s already configured
 */
function configure(packageJsonPath,data){
  var stampStart = computeStamp(data);
  if(!data.appnodes){
    data.appnodes = {};
  }
  if(!data.appnodes.config){
    data.appnodes.config = {};
  }
  if(!data.appnodes.config.uid){
    data.appnodes.config.uid = generateUid();
  }
  var stampFinish = computeStamp(data);
  if(stampStart != stampFinish){
    savePackageJson(packageJsonPath,data);
  }
}

/**
 * Saves modified package.json file
 * @param path
 * @param data
 */
function savePackageJson(path,data){
  var content = JSON.stringify(data,null,'  ');
  fs.writeFileSync(path,content);
}
/**
 * Computes a crc32 stamp value upon package string representation
 * @param value
 * @returns {string}
 */
function computeStamp(value){
  return crc32(util.inspect(value,{depth:null}))
    .toString('hex');
}

/**
 * Generates a new unique ID based on UUID version 4 algorithm
 * @returns {string} four : delimited pair of byte hex representation
 */
function generateUid(){
  return crc32 (uuid.v4 ())
      .toString ('hex')
      .toUpperCase ()
      .match (/.{1,2}/g)
      .join ('.');
}

/**
 * Load package.json file in JSON format from the path specified
 * @param path
 * @returns package.json JSON representation
 */
function getPackageJson(path){
  var content = fs.readFileSync(path);
  return JSON.parse(content);
}


function Configuration(filePath){
  var packageJsonPath = path.normalize(__dirname+'/'+filePath);
  var data = getPackageJson(packageJsonPath);
  var self = this;
  self.initialize = function(){
    configure(packageJsonPath,data);
  };
  self.uid = function(){
    if(!(data.globe && data.globe.config && data.globe.config.uid)){
      self.initialize();
    }
    return data.globe.config.uid;
  };
}

var configuration = new Configuration('../package.json');

module.exports = configuration;