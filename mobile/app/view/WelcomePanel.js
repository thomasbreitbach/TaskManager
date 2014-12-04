/*
 * File: app/view/WelcomePanel.js
 *
 * This file was generated by Sencha Architect
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.4.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.4.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('TaskManager.view.WelcomePanel', {
    extend: 'Ext.Container',
    alias: 'widget.welcomepanel',

    requires: [
        'Ext.Spacer',
        'Ext.Label',
        'Ext.Button',
        'Ext.SegmentedButton'
    ],

    config: {
        hidden: false,
        itemId: 'welcomePanel1',
        layout: {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        },
        items: [
            {
                xtype: 'spacer'
            },
            {
                xtype: 'label',
                locales: {
                    html: 'panels.welcome.welcome_label'
                },
                cls: 'info-label',
                html: 'Welcome in task manager.',
                width: ''
            },
            {
                xtype: 'spacer'
            },
            {
                xtype: 'button',
                locales: {
                    text: 'panels.welcome.login'
                },
                flex: 0,
                itemId: 'showLoginButton',
                margin: 20,
                padding: 8,
                ui: 'action',
                width: 200,
                iconCls: 'fa-lock',
                text: 'Login'
            },
            {
                xtype: 'button',
                locales: {
                    text: 'panels.welcome.register'
                },
                itemId: 'showRegisterButton',
                margin: 20,
                padding: 8,
                width: 200,
                iconCls: 'compose',
                text: 'Registrati'
            },
            {
                xtype: 'segmentedbutton',
                flex: 1,
                itemId: 'mysegmentedbutton',
                defaults: {
                    width: 100
                },
                layout: {
                    type: 'hbox',
                    align: 'center',
                    pack: 'center'
                },
                items: [
                    {
                        xtype: 'button',
                        locales: {
                            text: 'languages.al'
                        },
                        itemId: 'b_al',
                        icon: 'resources/flags/al.png',
                        iconAlign: 'top',
                        text: 'Albanian'
                    },
                    {
                        xtype: 'button',
                        locales: {
                            text: 'languages.en'
                        },
                        itemId: 'b_en',
                        icon: 'resources/flags/en.png',
                        iconAlign: 'top',
                        text: 'English'
                    },
                    {
                        xtype: 'button',
                        locales: {
                            text: 'languages.it'
                        },
                        itemId: 'b_it',
                        icon: 'resources/flags/it.png',
                        iconAlign: 'top',
                        text: 'Italian'
                    }
                ],
                listeners: [
                    {
                        fn: function(component, eOpts) {
                            var b = component.down('#b_' + Ux.locale.Manager.getLanguage());
                            component.setPressedButtons([b]);
                        },
                        delay: 100,
                        event: 'initialize'
                    }
                ]
            },
            {
                xtype: 'spacer'
            }
        ]
    }

});