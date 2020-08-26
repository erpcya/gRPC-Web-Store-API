/*************************************************************************************
 * Product: ADempiere gRPC Dictionary Client                       		               *
 * Copyright (C) 2012-2018 E.R.P. Consultores y Asociados, C.A.                      *
 * Contributor(s): Yamel Senih ysenih@erpya.com				  		                         *
 * This program is free software: you can redistribute it and/or modify              *
 * it under the terms of the GNU General Public License as published by              *
 * the Free Software Foundation, either version 3 of the License, or                 *
 * (at your option) any later version.                                               *
 * This program is distributed in the hope that it will be useful,                   *
 * but WITHOUT ANY WARRANTY; without even the implied warranty of                    *
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the                     *
 * GNU General Public License for more details.                                      *
 * You should have received a copy of the GNU General Public License                 *
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.            *
 ************************************************************************************/

class WebStore {

  /**
   * Constructor, No authentication required
   * @param {string} host
   * @param {string} version
   * @param {string} language
   */
  constructor({ host, version, language = 'en_US' }) {
    console.log('Constructor');
    this.host = host;
    this.version = version;
    this.language = language;
  }

  /**
   * Load gRPC Connection
   * @return {Object} Return request for get data
   */
  getService() {
    console.log('Start');
    console.log('Host: ', this.host);
    var grpc = require('grpc');
    var protoLoader = require('@grpc/proto-loader');
    console.log('Package');
    var packageDefinition = protoLoader.loadSync(
        'helloworld.proto',
        {keepCase: true,
         longs: String,
         enums: String,
         defaults: true,
         oneofs: true
        });
    console.log('After Package');
    var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;
    console.log('hello_proto ', hello_proto);
    return new hello_proto.Greeter(this.host, grpc.credentials.createInsecure());
  }

  /**
   * Make login
   * @param {string} userName User Name
   * @param {string} userPass User Pass
   * @return {Session} Session assigned
   */
  // sayHello({ name }) {
  //   this.getService().sayHello( { name: name }, function(err, response) {
  //     console.log('Greeting:', response.message);
  //   });
  // }
}
module.exports = WebStore;
