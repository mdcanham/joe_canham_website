var keystone = require('keystone');
var request = require('request');
var Types = keystone.Field.Types;
var env = require('dotenv');

var Vimeo = require('vimeo').Vimeo;
var lib = new Vimeo(process.env.VIMEO_CLIENT_ID, process.env.VIMEO_CLIENT_SECRET, process.env.VIMEO_ACCESS_TOKEN);

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
	if(this.videoId && (!this.customThumbnail.url || this.customThumbnail.url === '')){
		if(this.source === 'Youtube'){
			this.thumbnail = 'http://img.youtube.com/vi/' + this.videoId + '/maxresdefault.jpg';
			next();
		} else if(this.source === 'Vimeo'){
			var that = this;
			lib.request({
				path: '/videos/' + this.videoId + '/pictures'
			}, function(error, body, status_code, headers){
				var all = body.data[0].sizes;
				that.thumbnail = all[all.length - 1].link;
				next();
			});
		}
	} else if(this.videoId && this.customThumbnail) {
		this.thumbnail = this.customThumbnail.url;
		next();
	}

});

Video.register();
