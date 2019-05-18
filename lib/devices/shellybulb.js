
/* jshint -W097 */
/* jshint -W030 */
/* jshint strict:true */
/* jslint node: true */
/* jslint esversion: 6 */
'use strict';


async function getLightsObject(self) {
  let id = self.getDeviceName();
  let obj = {
    'ison': 'lights.Switch',
    'mode': 'lights.mode',
    'red': 'lights.red',
    'green': 'lights.green',
    'blue': 'lights.blue',
    'white': 'lights.white',
    'gain': 'lights.gain',
    'temp': 'lights.temp',
    'brightness': 'lights.brightness',
    'effect': 'lights.effect'
  };
  for (let i in obj) {
    let stateId = id + '.' + obj[i];
    let state = await self.adapter.getStateAsync(stateId);
    obj[i] = state ? state.val : undefined;
  }
  return obj;
}

/**
 * Shelly Bulb
 */
let shellybulb = {
  'lights.Switch': {
    coap: {
      coap_publish_funct: (value) => {
        return value.G[4][2] === 1 ? true : false;
      },
      http_cmd: '/color/0',
      http_cmd_funct: (value) => { return value === true ? { turn: 'on' } : { turn: 'off' }; },
    },
    mqtt: {
      mqtt_publish: 'shellies/shellybulb-<deviceid>/color/0',
      mqtt_publish_funct: (value) => { return value === 'on'; },
      mqtt_cmd: 'shellies/shellybulb-<deviceid>/color/0/command',
      mqtt_cmd_funct: (value) => { return value === true ? 'on' : 'off'; },
    },
    common: {
      'name': 'Switch',
      'type': 'boolean',
      'role': 'switch',
      'read': true,
      'write': true,
      'def': false
    }
  },
  'lights.AutoTimerOff': {
    coap: {
      http_publish: '/settings',
      http_publish_funct: (value) => { return value ? JSON.parse(value).lights[0].auto_off : undefined; },
      http_cmd: '/settings/light/0',
      http_cmd_funct: (value) => { return { auto_off: value }; }
    },
    mqtt: {
      http_publish: '/settings',
      http_publish_funct: (value) => { return value ? JSON.parse(value).lights[0].auto_off : undefined; },
      http_cmd: '/settings/light/0',
      http_cmd_funct: (value) => { return { auto_off: value }; }
    },
    common: {
      'name': 'Auto Timer Off',
      'type': 'number',
      'role': 'level.timer',
      'def': 0,
      'unit': 's',
      'read': true,
      'write': true
    }
  },
  'lights.AutoTimerOn': {
    coap: {
      http_publish: '/settings',
      http_publish_funct: (value) => { return value ? JSON.parse(value).lights[0].auto_on : undefined; },
      http_cmd: '/settings/light/0',
      http_cmd_funct: (value) => { return { auto_on: value }; }
    },
    mqtt: {
      http_publish: '/settings',
      http_publish_funct: (value) => { return value ? JSON.parse(value).lights[0].auto_on : undefined; },
      http_cmd: '/settings/light/0',
      http_cmd_funct: (value) => { return { auto_on: value }; }
    },
    common: {
      'name': 'Auto Timer Off',
      'type': 'number',
      'role': 'level.timer',
      'def': 0,
      'unit': 's',
      'read': true,
      'write': true
    }
  },
  'lights.mode': {
    coap: {
      http_publish: '/settings',
      http_publish_funct: (value) => { return value ? JSON.parse(value).mode : undefined; },
      http_cmd: '/settings',
      http_cmd_funct: (value) => { return { mode: value }; }
    },
    mqtt: {
      mqtt_publish: 'shellies/shellybulb-<deviceid>/color/0/status',
      mqtt_publish_funct: (value) => { return value ? JSON.parse(value).mode : undefined; },
      mqtt_cmd: 'shellies/shellybulb-<deviceid>/color/0/set',
      mqtt_cmd_funct: async (value, self) => { return JSON.stringify(await getLightsObject(self)); }
    },
    common: {
      'name': 'Modus',
      'type': 'string',
      'role': 'state',
      'read': true,
      'write': true,
      'states': 'color:color;white:white'
    }
  },
  'lights.red': {
    coap: {
      http_publish: '/color/0',
      http_publish_funct: (value) => {
        return value ? JSON.parse(value).red : undefined;
      },
      http_cmd: '/color/0',
      http_cmd_funct: (value) => { return { red: value }; }
    },
    mqtt: {
      mqtt_publish: 'shellies/shellybulb-<deviceid>/color/0/status',
      mqtt_publish_funct: (value) => { return value ? JSON.parse(value).red : undefined; },
      mqtt_cmd: 'shellies/shellybulb-<deviceid>/color/0/set',
      mqtt_cmd_funct: async (value, self) => { return JSON.stringify(await getLightsObject(self)); }
    },
    common: {
      'name': 'Red',
      'type': 'number',
      'role': 'level.color.red',
      'read': true,
      'write': true,
      'min': 0,
      'max': 255
    }
  },
  'lights.green': {
    coap: {
      http_publish: '/color/0',
      http_publish_funct: (value) => {
        return value ? JSON.parse(value).green : undefined;
      },
      http_cmd: '/color/0',
      http_cmd_funct: (value) => { return { green: value }; }
    },
    mqtt: {
      mqtt_publish: 'shellies/shellybulb-<deviceid>/color/0/status',
      mqtt_publish_funct: (value) => { return value ? JSON.parse(value).green : undefined; },
      mqtt_cmd: 'shellies/shellybulb-<deviceid>/color/0/set',
      mqtt_cmd_funct: async (value, self) => { return JSON.stringify(await getLightsObject(self)); }
    },
    common: {
      'name': 'Green',
      'type': 'number',
      'role': 'level.color.green',
      'read': true,
      'write': true,
      'min': 0,
      'max': 255
    }
  },
  'lights.blue': {
    coap: {
      http_publish: '/color/0',
      http_publish_funct: (value) => {
        return value ? JSON.parse(value).blue : undefined;
      },
      http_cmd: '/color/0',
      http_cmd_funct: (value) => { return { blue: value }; }
    },
    mqtt: {
      mqtt_publish: 'shellies/shellybulb-<deviceid>/color/0/status',
      mqtt_publish_funct: (value) => { return value ? JSON.parse(value).blue : undefined; },
      mqtt_cmd: 'shellies/shellybulb-<deviceid>/color/0/set',
      mqtt_cmd_funct: async (value, self) => { return JSON.stringify(await getLightsObject(self)); }
    },
    common: {
      'name': 'Green',
      'type': 'number',
      'role': 'level.color.blue',
      'read': true,
      'write': true,
      'min': 0,
      'max': 255
    }
  },
  'lights.white': {
    coap: {
      http_publish: '/color/0',
      http_publish_funct: (value) => {
        return value ? JSON.parse(value).white : undefined;
      },
      http_cmd: '/color/0',
      http_cmd_funct: (value) => { return { white: value }; }
    },
    mqtt: {
      mqtt_publish: 'shellies/shellybulb-<deviceid>/color/0/status',
      mqtt_publish_funct: (value) => { return value ? JSON.parse(value).white : undefined; },
      mqtt_cmd: 'shellies/shellybulb-<deviceid>/color/0/set',
      mqtt_cmd_funct: async (value, self) => { return JSON.stringify(await getLightsObject(self)); }
    },
    common: {
      'name': 'White',
      'type': 'number',
      'role': 'level.color.white',
      'read': true,
      'write': true,
      'min': 0,
      'max': 255
    }
  },
  'lights.gain': {
    coap: {
      http_publish: '/color/0',
      http_publish_funct: (value) => {
        return value ? JSON.parse(value).gain : undefined;
      },
      http_cmd: '/color/0',
      http_cmd_funct: (value) => { return { gain: value }; }
    },
    mqtt: {
      mqtt_publish: 'shellies/shellybulb-<deviceid>/color/0/status',
      mqtt_publish_funct: (value) => { return value ? JSON.parse(value).gain : undefined; },
      mqtt_cmd: 'shellies/shellybulb-<deviceid>/color/0/set',
      mqtt_cmd_funct: async (value, self) => { return JSON.stringify(await getLightsObject(self)); }
    },
    common: {
      'name': 'Gain',
      'type': 'number',
      'role': 'level',
      'read': true,
      'write': true,
      'min': 0,
      'max': 100
    }
  },
  'lights.temp': {
    coap: {
      http_publish: '/color/0',
      http_publish_funct: (value) => {
        return value ? JSON.parse(value).temp : undefined;
      },
      http_cmd: '/color/0',
      http_cmd_funct: (value) => { return { temp: value }; }
    },
    mqtt: {
      mqtt_publish: 'shellies/shellybulb-<deviceid>/color/0/status',
      mqtt_publish_funct: (value) => { return value ? JSON.parse(value).temp : undefined; },
      mqtt_cmd: 'shellies/shellybulb-<deviceid>/color/0/set',
      mqtt_cmd_funct: async (value, self) => { return JSON.stringify(await getLightsObject(self)); }
    },
    common: {
      'name': 'Temperature',
      'type': 'number',
      'role': 'level.temperature',
      'read': true,
      'write': true,
      'min': 0,
      'max': 100
    }
  },
  'lights.brightness': {
    coap: {
      http_publish: '/color/0',
      http_publish_funct: (value) => {
        return value ? JSON.parse(value).brightness : undefined;
      },
      http_cmd: '/color/0',
      http_cmd_funct: (value) => { return { brightness: value }; }
    },
    mqtt: {
      mqtt_publish: 'shellies/shellybulb-<deviceid>/color/0/status',
      mqtt_publish_funct: (value) => { return value ? JSON.parse(value).brightness : undefined; },
      mqtt_cmd: 'shellies/shellybulb-<deviceid>/color/0/set',
      mqtt_cmd_funct: async (value, self) => { return JSON.stringify(await getLightsObject(self)); }
    },
    common: {
      'name': 'Brightness',
      'type': 'number',
      'role': 'level.brightness',
      'read': true,
      'write': true,
      'min': 0,
      'max': 100
    }
  },
  'lights.effect': {
    coap: {
      http_publish: '/settings/light/0',
      http_publish_funct: (value) => { return value ? JSON.parse(value).effect : undefined; },
      http_cmd: '/settings/light/0',
      http_cmd_funct: (value) => { return { effect: value }; }
    },
    mqtt: {
      mqtt_publish: 'shellies/shellybulb-<deviceid>/color/0/status',
      mqtt_publish_funct: (value) => { return value ? JSON.parse(value).effect : undefined; },
      mqtt_cmd: 'shellies/shellybulb-<deviceid>/color/0/set',
      mqtt_cmd_funct: async (value, self) => { return JSON.stringify(await getLightsObject(self)); }
    },
    common: {
      'name': 'Effect',
      'type': 'number',
      'role': 'state',
      'read': true,
      'write': true,
      'min': 0,
      'max': 100,
      'states': '0:Off;1:Meteor Shower;2:Gradual Change;3:Breath;4:Flash;5:On/Off Gradual;6:Red/Green Change'
    }
  },
  'online': {
    coap: {
    },
    mqtt: {
      // mqtt_publish: 'shellies/shelly1-<deviceid>/online'
    },
    common: {
      'name': 'Online',
      'type': 'boolean',
      'role': 'indicator.reachable',
      'read': true,
      'write': false
    }
  },
  'firmware': {
    coap: {
      http_publish: '/status',
      http_publish_funct: (value) => { return value ? JSON.parse(value).update.has_update : undefined; }
    },
    mqtt: {
      mqtt_publish: 'shellies/announce',
      mqtt_publish_funct: (value) => { return value ? JSON.parse(value).new_fw : false; }
    },
    common: {
      'name': 'New firmware available',
      'type': 'boolean',
      'role': 'state',
      'read': true,
      'write': false
    }
  },
  'hostname': {
    coap: {
      http_publish: '/status',
      http_publish_funct: (value) => { return value ? JSON.parse(value).wifi_sta.ip : undefined; }
    },
    mqtt: {
      mqtt_publish: 'shellies/announce',
      mqtt_publish_funct: (value) => { return value ? JSON.parse(value).ip : false; }
    },
    common: {
      'name': 'Device Hostname',
      'type': 'string',
      'role': 'info.ip',
      'read': true,
      'write': false
    }
  },
  'rssi': {
    coap: {
      http_publish: '/status',
      http_publish_funct: (value) => { return value && JSON.parse(value) && JSON.parse(value).wifi_sta ? JSON.parse(value).wifi_sta.rssi : 0; }
    },
    mqtt: {
      http_publish: '/status',
      http_publish_funct: (value) => { return value && JSON.parse(value) && JSON.parse(value).wifi_sta ? JSON.parse(value).wifi_sta.rssi : 0; }
    },
    common: {
      'name': 'Device RSSI status',
      'type': 'number',
      'role': 'value',
      'read': true,
      'write': false
    }
  },
  'protocol': {
    coap: {
      coap_init_value: 'coap'
    },
    mqtt: {
      mqtt_init_value: 'mqtt'
    },
    common: {
      'name': 'Protocol',
      'type': 'string',
      'role': 'info',
      'read': true,
      'write': false
    }
  }
};

module.exports = {
  shellybulb: shellybulb
};