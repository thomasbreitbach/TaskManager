/*
 * File: app/controller/Tasks.js
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

Ext.define('TaskManager.controller.Tasks', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            taskNavView: 'tasknavview',
            taskFormField: 'taskpanel #taskFormField',
            deleteButton: 'taskpanel #deleteButton'
        },

        control: {
            "tasknavview #addButton": {
                tap: 'add'
            },
            "tasklist": {
                itemtap: 'edit',
                initialize: 'onTaskListInitialize'
            },
            "taskpanel #saveButton": {
                tap: 'save'
            },
            "taskpanel #deleteButton": {
                tap: 'remove'
            }
        }
    },

    add: function(button, e, eOpts) {
        this.getTaskNavView().push({
            xtype: 'taskpanel',
            locales:{
                title: 'panels.task.titles.new'
            }
        });

        this.getDeleteButton().hide();
    },

    edit: function(dataview, index, target, record, e, eOpts) {
        var mainView = this.getTaskNavView();

        mainView.push({
            xtype: 'taskpanel',
            locales:{
                title: 'panels.task.titles.edit'
            }
        });
        this.getDeleteButton().show();

        record.set('task_id', record.get('id'));
        var taskFormField = this.getTaskFormField(),
            fields = taskFormField.getFieldsAsArray();

        Ext.each(fields, function(field) {
            var key = field.getName(),
                value = record.get(key);
            field.setValue(value);
        });

        mainView.setRecord(record);

        this.holdSelect = true;
    },

    save: function(button, e, eOpts) {
        var fields = this.getTaskFormField().getFieldsAsArray(),
            data = {};

        var mainView = this.getTaskNavView(),
            record = mainView.getRecord(),
            store = mainView.down('tasklist').getStore();
        Ext.each(fields, function (field) {
            var key = field.getName(),
                value = field.getValue();
            data[key] = value;
        });
        var model = Ext.create('TaskManager.model.Task', data);
        model.set('userId', TaskManager.user.getData());
        model.set('id', data['task_id']);
        model.save({
            success: function (task) {
                if(task){
                    if (record) {
                        record.set(task.getData());
                        mainView.setRecord(null);
                    } else {
                        store.add(task);
                    }
                    store.sort();

                    // Navigate back to list
                    mainView.pop();
                }
            },
            failure: function () {
                console.log('Salvatagio falito');
            }
        });


    },

    remove: function(button, e, eOpts) {
        var me = this,
            title = Ux.locale.Manager.get('messages.attention'),
            message = Ux.locale.Manager.get('messages.deletion_confirm'),
            yes = Ux.locale.Manager.get('buttons.yes');


        Ext.Msg.confirm(title, message, function(response) {
            if (response === yes) {

        		var mainView = me.getTaskNavView(),
        		tasks = mainView.down('tasklist').getStore(),
        		task = mainView.getRecord();
                mainView.mask();
                task.erase({
                    success: function() {
                        mainView.unmask();
                        tasks.remove(task);
                        mainView.pop();
                    },
                    failure: function() {
                        mainView.unmask();
                        Ext.Msg.alert("Failure","Some error occors loading tasks", Ext.emptyFn);
                    }
                });

            }
        });
    },

    onTaskListInitialize: function(component, eOpts) {
        var me = this, mainView = me.getTaskNavView();
        var taskStore = component.getStore();
        mainView.mask();
        var store = Ext.create('TaskManager.store.Tasks', {
            proxy: {
                type: 'rest',
                //we want to load only the tasks of current user
                url : TaskManager.restUrl + 'task?user_id=' + TaskManager.user.get('id')
            }
        });
        store.load({
            callback: function(records, operation, success) {
                mainView.unmask();
                if(success){
                    taskStore.setData(records);
                }
                else{
                    Ext.Msg.alert("Failure","Some error occors loading tasks", Ext.emptyFn);
                }
            },
            scope: this
        });
    }

});