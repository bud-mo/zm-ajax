/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Web Client
 * Copyright (C) 2008, 2009, 2010, 2011, 2013 Zimbra Software, LLC.
 * 
 * The contents of this file are subject to the Zimbra Public License
 * Version 1.4 ("License"); you may not use this file except in
 * compliance with the License.  You may obtain a copy of the License at
 * http://www.zimbra.com/license.
 * 
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied.
 * ***** END LICENSE BLOCK *****
 */


/**
 * Creates a Header Tree Item.
 * @constructor
 * @class
 * This class implements a tree item widget.
 *
 * @author Dave Comfort
 *
 * @param {hash}	params				a hash of parameters
 * @param {DwtComposite}      params.parent				the parent widget
 * @param {number}      params.index 				the index at which to add this control among parent's children
 * @param {string}      params.text 					the label text for the tree item
 * @param {string}      params.imageInfo				the icon for the tree item
 * @param {boolean}      params.deferred				if <code>true</code>, postpone initialization until needed.
 * @param {string}      params.className				the CSS class
 * @param  {constant}	params.posStyle				the positioning style
 * @param {boolean}      params.forceNotifySelection	force notify selection even if checked style
 * @param {boolean}      params.forceNotifyAction		force notify action even if checked style
 * @param {hash}		  params.button				a hash of data for showing a button in the item: image, tooltip, callback
 * @param {boolean}      params.selectable			if <code>true</code>, this item is selectable
 *        
 * @extend		DwtTreeItem
 */
DwtHeaderTreeItem = function(params) {
	this.overview = params.overview;
	this._button = params.button;
	this._noNodeCell = params.noNodeCell;
	DwtTreeItem.call(this, params);
};

DwtHeaderTreeItem.prototype = new DwtTreeItem;
DwtHeaderTreeItem.prototype.constructor = DwtHeaderTreeItem;

DwtHeaderTreeItem.prototype.TEMPLATE = "dwt.Widgets#ZHeaderTreeItem";

DwtHeaderTreeItem.prototype.toString =
function() {
	return "DwtHeaderTreeItem";
};

DwtHeaderTreeItem.prototype._createHtmlFromTemplate =
function(template, data) {
	data.noNodeCell = this._noNodeCell;
	DwtTreeItem.prototype._createHtmlFromTemplate.apply(this, arguments);
};

DwtHeaderTreeItem.prototype._initialize =
function() {
	DwtTreeItem.prototype._initialize.apply(this, arguments);
	if (this._button) {
		this._headerButtonId = this._htmlElId + "_headerButton";
		var buttonEl = document.getElementById(this._headerButtonId);
		if (buttonEl) {
			this._buttonItem = new DwtBorderlessButton({parent:this, style:DwtLabel.IMAGE_LEFT, className:"Img"+this._button.image});
			//this._buttonItem.setImage(this._button.image);
			this._buttonItem.setToolTipContent(this._button.tooltip);
			this._buttonItem.addSelectionListener(new AjxListener(this, this._onclickHandler));
			this._buttonItem.replaceElement(this._headerButtonId);
		}
	}
};

DwtHeaderTreeItem.prototype._onclickHandler =
function(ev) {
	var mouseEv = DwtShell.mouseEvent;
	mouseEv.setFromDhtmlEvent(ev, this);
	this._button.callback.run(mouseEv);
};

DwtHeaderTreeItem.prototype._focusByMouseUpEvent =
function(ev)  {
	var targetId = ev.target && ev.target.id;
	if (targetId && (targetId == this._headerButtonId)) { return; }
	DwtTreeItem.prototype._focusByMouseUpEvent.apply(this, arguments);
};
