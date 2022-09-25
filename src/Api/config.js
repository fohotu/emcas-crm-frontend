const config = {
    apiHost:'http://127.0.0.1:8000/api',
    wsHost:'http://127.0.0.1',
    wsPort:6001,
   
}

export const url={
    alert:{

    },
    answer:{
        create:config.apiHost + '/answer/create',
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
        view:config.apiHost + '/tasks/view',
        update:config.apiHost + '/tasks/update',
        changeStatus:config.apiHost + '/tasks/change-status',
    },

    user:{
        login:config.apiHost + '/login',
        list:config.apiHost + '/user/list',
        task:config.apiHost + '/user/task',
        createTask:config.apiHost + '/user/task/create',
        removeTask:config.apiHost + '/user/task/remove',
    },
    work:{
        workListByCategory:config.apiHost + '/work/by-category',
        workPaginatedListByCategory:config.apiHost + '/work/by-category/paginate',
        create:config.apiHost + '/work/create',
        single:config.apiHost + '/work/single',
        update:config.apiHost + '/work/update',
    },
    file:{
        upload:config.apiHost+'/file/upload',
        remove:config.apiHost+'/file/remove'
    },
    search: {
        live:config.apiHost+'/search/live',
        simple:config.apiHost+'/search/simple',
        selfFilter:config.apiHost+'/search/filter',
    },
    download:{
        simple:config.apiHost+'/download',
    }

};

export default config;