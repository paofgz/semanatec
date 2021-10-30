import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: { 
        themes:{
            dark: {
                background: '#222831',
                primaryComponents: '393E46',
                primary: '#00ADB5',
                text: '#EEEEEE',
                accent: '#82B1FF',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107',
            }
        },
        dark: true,
    },
});
 