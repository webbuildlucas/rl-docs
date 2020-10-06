---
title: Texels
---
# Blender Basics 

Now that you are familiar with the way that UV maps work, it’s important to discuss the textures themselves.

If you have played older 3D games (c. 2000), the concept of a texel will instantly be familiar. Minecraft is another fine example, but that style is done with more intentionality.

![alt text](../.vuepress/public/images/image97.png)![alt text](../.vuepress/public/images/image63.png)

*Old school cool vs New school cool*

A texel is the screen space covered by one pixel of a texture when that texture is applied to a 3D mesh. Sometimes the definition is slightly looser, referring to regions of the texture and how they map to what is seen by the player.

In older 3D games, due to hardware limitations, textures were very low resolution, resulting in texels which are very large on the screen. Game engines typically apply some kind of filtering to these textures to avoid excessive pixelation (again, the style of Minecraft being a notable exception), and so the result is often a muddy, blurry texture. Modern games (such as Star Citizen) have much, much higher resolution textures and require much, much more capable hardware.

**In an ideal world, one pixel of a texture on any object would always map to one pixel on the player’s screen.** This gets problematic when considering 1920x1920 textures on every single object, so there are a few considerations that can be summarized as follows:

- Will this be played on high-end or low-end hardware?
- Is this object going to be large or small in the world?
- Will this object be seen up close by the player?
- Does this object need text or fine details on it?
- Will this object be moving or static?