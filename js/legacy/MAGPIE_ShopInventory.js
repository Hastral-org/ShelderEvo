//#region META
/*:
 * @target MZ
 * @plugindesc [Tier_S] v0.1.0 MAGPIE_ShopInventory
 * @author Matheraptor
 * @url https://matheraptor.itch.io/magpie-shopinventory
 * 
 * @help
 * (MAGPIE) SHOP INVENTORY (Standalone)
 * Shops are instances with shopID and inventory
 * 
 * 
 * ----------------------------------------------------------------------------
 * CHANGELOG
 * ----------------------------------------------------------------------------
 * v0.1.0 2025 08 18 
 * - initial build
 */
//#endregion





//------------------------------------------------------------------------
//#region INDEX

var MAGPIE = MAGPIE || {};
MAGPIE.version = MAGPIE.version || "0.7.1";
MAGPIE.addons = MAGPIE.addons || {};
MAGPIE.addons.ShopInventory = {};
MAGPIE.addons.ShopInventory.version = "0.1.0";
MAGPIE.addons.ShopInventory.pluginName = "MAGPIE_ShopInventory";
MAGPIE.addons.ShopInventory.parameters = PluginManager
    .parameters(MAGPIE.addons.ShopInventory.pluginName);

var $gameShops = null;
//#endregion





//------------------------------------------------------------------------
//#region SCENE EDIT

MAGPIE.addons.ShopInventory._Scene_Shop_prepare = Scene_Shop.prototype.prepare;
Scene_Shop.prototype.prepare = function(goods, purchaseOnly, shopID)
{
    MAGPIE.addons.ShopInventory._Scene_Shop_prepare.call(this, goods, purchaseOnly);
    this._shopID = shopID;
    this._goods = $gameShops._shops[shopID]._goods;
}

MAGPIE.addons.ShopInventory._Scene_Shop_maxBuy = Scene_Shop.prototype.maxBuy;
Scene_Shop.prototype.maxBuy = function()
{
    let max = MAGPIE.addons.ShopInventory._Scene_Shop_maxBuy.call(this);
    return Math.min(this._quantity[this.index()], max)
}

MAGPIE.addons.ShopInventory._Scene_Shop_doBuy = Scene_Shop.prototype.doBuy;
Scene_Shop.prototype.doBuy = function(number)
{
    MAGPIE.addons.ShopInventory._Scene_Shop_doBuy.call(this, number);
    let good = $gameShops._shops[this._shopID]._goods.find(item => item == this._item);
    good[4] -= number;
}

MAGPIE.addons.ShopInventory._Scene_Shop_doSell = Scene_Shop.prototype.doSell;
Scene_Shop.prototype.doSell = function(number)
{
    MAGPIE.addons.ShopInventory._Scene_Shop_doSell.call(this, number);
    let good = $gameShops._shops[this._shopID]._goods.find(item => item == this._item);
    good[4] += number;
}
//#endregion





//------------------------------------------------------------------------
//#region WINDOW EDIT

MAGPIE.addons.ShopInventory._Window_ShopBuy_makeItemList = Window_ShopBuy
    .prototype.makeItemList;
Window_ShopBuy.prototype.makeItemList = function()
{
    MAGPIE.addons.ShopInventory._Window_ShopBuy_makeItemList.call(this);
    this._quantity = [];
    this._shopGoods.forEach((good, index) => this._quantity[index] = good[4]);
}

MAGPIE.addons.ShopInventory._Window_ShopBuy_drawItem = Window_ShopBuy.prototype.drawItem;
Window_ShopBuy.prototype.drawItem = function(index)
{
    MAGPIE.addons.ShopInventory._Window_ShopBuy_drawItem.call(this, index);
    const quantity = this._quantity[index];
    const rect = this.itemLineRect(index);
    const quantityWidth = this.quantityWidth();
    const quantity_x = rect.x + rect.width - this.priceWidth() - quantityWidth;
    this.drawText(quantity, quantity_x, rect.y, quantityWidth, "Center");
    if(!quantity) this.changePaintOpacity(false);
}

Window_ShopBuy.prototype.quantityWidth = function()
{
    return 96;
}

//#endregion





//------------------------------------------------------------------------
//#region Game_Shop

function Game_Shops()
{
    this.initialize(...arguments);
}

Game_Shops.prototype.initialize = function()
{
    this._shops = [];
}

function Game_Shop()
{
    this.initialize(...arguments);
}

Game_Shop.prototype.initialize = function()
{
    this.id = $gameShops?._shops.length || 0;
    this._goods = [];
}

Game_Shop.prototype.addGood = function(itemType = 0, itemId = 0, priceType = 0, 
    customPrice = 0, quantity = 1)
{
    let item = [itemType, itemId, priceType, customPrice, quantity];
    this._goods.push(item);
}

Game_Shop.prototype.getGoodById = function(itemId)
{
    return this._goods.find(item => item[1] === itemId)
}

Game_Shop.prototype.stockGood = function(itemId, quantity)
{
    let item = this.getGoodById(itemId)[4];
    let result = item += quantity;
    if(result < 0) this.removeGood(itemId);
    return result
}

Game_Shop.prototype.removeGood = function(itemId)
{
    this._goods.splice(this._goods.findIndex(item => item[1] === itemId), 1);
}

//#endregion




//------------------------------------------------------------------------
//#region Save data

MAGPIE.addons.ShopInventory._DataManager_createSave = DataManager.createGameObjects;
DataManager.createGameObjects = function()
{
    MAGPIE.addons.ShopInventory._DataManager_createSave.call(this);
    $gameShops = new Game_Shops();
}

MAGPIE.addons.ShopInventory._DataManager_makeSave = DataManager.makeSaveContents;
DataManager.makeSaveContents = function()
{
    const contents = MAGPIE.addons.ShopInventory._DataManager_makeSave.call(this);
    contents.shops = $gameShops;
    return contents
}

MAGPIE.addons.ShopInventory._DataManager_loadSave = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents)
{
    MAGPIE.addons.ShopInventory._DataManager_loadSave.call(this, contents);
    $gameShops = contents.shops;
}

//#endregion


//end of plugin