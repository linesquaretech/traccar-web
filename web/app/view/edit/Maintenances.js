/*
 * Copyright 2018 Anton Tananaev (anton@traccar.org)
 * Copyright 2018 Andrey Kunitsyn (andrey@traccar.org)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

Ext.define('Traccar.view.edit.Maintenances', {
    extend: 'Traccar.view.GridPanel',
    xtype: 'maintenancesView',

    requires: [
        'Traccar.view.edit.MaintenancesController',
        'Traccar.view.edit.Toolbar'
    ],

    controller: 'maintenances',
    store: 'Maintenances',

    tbar: {
        xtype: 'editToolbar'
    },

    listeners: {
        selectionchange: 'onSelectionChange'
    },

    columns: {
        defaults: {
            flex: 1,
            minWidth: Traccar.Style.columnWidthNormal
        },
        items: [{
            text: Strings.sharedName,
            dataIndex: 'name',
            filter: 'string'
        }, {
            text: Strings.sharedType,
            dataIndex: 'type',
            filter: {
                type: 'list',
                idField: 'key',
                labelField: 'name',
                store: 'MaintenanceTypes'
            },
            renderer: function (value) {
                var attribute = Ext.getStore('MaintenanceTypes').getById(value);
                return attribute && attribute.get('name') ? attribute.get('name') : value;
            }
        }, {
            text: Strings.maintenanceStart,
            dataIndex: 'start',
            renderer: function (value, metaData, record) {
                return Traccar.AttributeFormatter.renderAttribute(
                    value, Ext.getStore('MaintenanceTypes').getById(record.get('type')));
            }
        }, {
            text: Strings.maintenancePeriod,
            dataIndex: 'period',
            renderer: function (value, metaData, record) {
                return Traccar.AttributeFormatter.renderAttribute(
                    value, Ext.getStore('MaintenanceTypes').getById(record.get('type')));
            }
        }]
    }
});
