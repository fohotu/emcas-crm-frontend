const config={
    apiHost:'http://127.0.0.1:8000/api',
    wsHost:'http://127.0.0.1',
    wsPort:6001,
   
}

export const url={
    alert:{

    },
    answer:{

    },
    category:{
        list:config.apiHost + '/category/list',
        
    },
    pagination:{

    },
    search:{

    },
    task:{
        index:config.apiHost + '/tasks/index',
        single:config.apiHost + '/tasks/single',
        create:config.apiHost + '/tasks/create',
    },
    user:{
        login:config.apiHost + '/login',
        list:config.apiHost + '/user/list',
    },
    work:{
        workListByCategory:config.apiHost + '/work/by-category',
    },
    file:{
        upload:config.apiHost+'/file/upload',
        remove:config.apiHost+'/file/remove'
    },
    search:{
        live:config.apiHost+'/search/live',
        simple:config.apiHost+'/search/simple',
        selfFilter:config.apiHost+'/search/filter',
    },

};

export default config;