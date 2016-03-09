var keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

var Skill = new keystone.List('Skill', {
	autokey: { from: 'name', path: 'key', unique: true },
	sortable: true
});

Skill.add({
	name: { type: String, required: true }
});

Skill.register();
