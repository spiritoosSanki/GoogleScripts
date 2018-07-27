/**
* This script will disable download/copy/print in all files present in a folder (and its subfolder).
* Just modify the folder ID "A_FOLDER_ID"
* 
* 
*     Copyright (C) <year>  <name of author>
* 
*     This program is free software: you can redistribute it and/or modify
*     it under the terms of the GNU General Public License as published by
*     the Free Software Foundation, either version 3 of the License, or
*     (at your option) any later version.

*     This program is distributed in the hope that it will be useful,
*     but WITHOUT ANY WARRANTY; without even the implied warranty of
*     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*     GNU General Public License for more details.

*     You should have received a copy of the GNU General Public License
*     along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
*/


function entryPoint() {
  var root = DriveApp.getFolderById("A_FOLDER_ID");
  
  diveInFolder(root);
}

function restrictOneFile(file) {
  Logger.log("file: " + file.getName());
  var labels = { 'labels': {restricted: true} };
  Drive.Files.update(labels, file.getId());
}

function diveInFolder(folder) {
  Logger.log("folder: " + folder.getName());    
  var files = folder.getFiles();
  while (files.hasNext()) {
    restrictOneFile(files.next());
  }
  
  var subfolders = folder.getFolders();
  while (subfolders.hasNext()) {
    diveInFolder(subfolders.next());
  }
}