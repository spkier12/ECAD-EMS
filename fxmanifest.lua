-- Resource Metadata
fx_version 'cerulean'
games { 'gta5' }

author 'Ulrik Brun'
description 'Ulriks Paramedic CAD'
version '1.0.0'

-- What to run
client_scripts {
	'Client.lua'
}
server_script '@oxmysql/lib/MySQL.lua'
server_script 'Server.lua'


ui_page './NUI/index.html'
files {
	'./NUI/index.html',
	'./NUI/index.js',
	'./NUI/fivem.js',
	'./NUI/index.css',
	'./NUI/logo.png',

}

escrow_ignore {
	'./NUI/index.html',
	'./NUI/logo.png',
	'./NUI/index.css',
	'./NUI/index.js',
	'./NUI/fivem.js',
}

lua54 'yes'