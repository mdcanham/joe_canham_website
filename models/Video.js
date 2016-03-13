var keystone = require('keystone');
var request = require('request');
var Types = keystone.Field.Types;
var env = require('dotenv');

var Video = new keystone.List('Video', {
	autokey: { from: 'source videoId', path: 'key', unique: true },
	sortable: true
});

Video.add({
	name: { type: String, initial: true, required: true },
	description: { type: Types.Textarea, initial: true },
	videoId: { type: String, required: true, initial: true, default: 'wl2tkFS-C1c' },
	source: { type: Types.Select, options: 'Youtube, Vimeo', required: true, initial: true, default: 'Youtube' },
	category: { type: Types.Relationship, ref: 'Category', initial: true },
	size: { type: Types.Select, options: 'Normal, Feature', default: 'Normal' },
	thumbnail: {type: String, noedit: true, hidden: true},
	playPreview: {type: Types.Boolean, default: 'false'},
	customThumbnail: {type: Types.CloudinaryImage, folder: 'img/thumbnails', autoCleanup: true, select: true, selectPrefix: 'img/thumbnails'}
});

Video.schema.pre('save', function(next){
	console.log(this.customThumbnail);
	if(this.videoId && (!this.customThumbnail || this.customThumbnail.url === '')){
		this.thumbnail = 'http://img.youtube.com/vi/' + this.videoId + '/maxresdefault.jpg';
	} else if(this.videoId && this.customThumbnail) {
		this.thumbnail = this.customThumbnail.url;
	}
	next();
});

Video.register();
