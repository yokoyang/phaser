/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Sprites are the lifeblood of your game, used for nearly everything visual.
*
* At its most basic a Sprite consists of a set of coordinates and a texture that is rendered to the canvas.
* They also contain additional properties allowing for physics motion (via Sprite.body), input handling (via Sprite.input),
* events (via Sprite.events), animation (via Sprite.animations), camera culling and more. Please see the Examples for use cases.
*
* @class Phaser.GameObject.Sprite
* @constructor
* @extends Phaser.Components.BaseTransform
* @param {Phaser.Game} game - A reference to the currently running game.
* @param {number} x - The x coordinate (in world space) to position the Sprite at.
* @param {number} y - The y coordinate (in world space) to position the Sprite at.
* @param {string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture} key - This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
* @param {string|number} frame - If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
*/
Phaser.GameObject.Sprite = function (game, x, y, key, frame)
{
    this.game = game;

    Phaser.Component.BaseTransform.call(this, x, y);

    /**
    * @property {number} type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.SPRITE;

    /**
    * @property {number} physicsType - The const physics body type of this object.
    * @readonly
    */
    this.physicsType = Phaser.SPRITE;

    this.name = '';

    this.parent = null;

    this.texture = game.textures.get(key);

    this.frame = this.texture.get(frame);

    this.children = new Phaser.Component.Children(this);

    //  Allows you to turn off a GO from rendering, but still render its children
    this.skipRender = (key === undefined);

    this.visible = true;

    this.data = new Phaser.Component.Data(this);

    this.color = new Phaser.Component.Color(this);

    //  Temporary for now?
    // this.alpha = 1;
    // this.worldAlpha = 1;
    // this.blendMode = Phaser.blendModes.NORMAL;
    this.scaleMode = Phaser.scaleModes.DEFAULT;
    this.exists = true;
};

Phaser.GameObject.Sprite.prototype = Object.create(Phaser.Component.BaseTransform.prototype);
Phaser.GameObject.Sprite.prototype.constructor = Phaser.GameObject.Sprite;

/**
* Automatically called by World.preUpdate.
*
* @method Phaser.Sprite#preUpdate
* @memberof Phaser.Sprite
*/
Phaser.GameObject.Sprite.prototype.preUpdate = function ()
{
    if (this.parent)
    {
        this.color.worldAlpha = this.parent.color.worldAlpha;
    }

    this.children.preUpdate();
};

Phaser.GameObject.Sprite.prototype.update = function ()
{
};

Phaser.GameObject.Sprite.prototype.postUpdate = function ()
{
};

Object.defineProperties(Phaser.GameObject.Sprite.prototype, {

    width: {

        enumerable: true,

        get: function ()
        {
            return this.transform._scaleX * this.frame.realWidth;
        },

        set: function (value)
        {
            this.scaleX = value / this.frame.realWidth;
        }

    },

    height: {

        enumerable: true,

        get: function ()
        {
            return this.transform._scaleY * this.frame.realHeight;
        },

        set: function (value)
        {
            this.scaleY = value / this.frame.realHeight;
        }

    }

});
