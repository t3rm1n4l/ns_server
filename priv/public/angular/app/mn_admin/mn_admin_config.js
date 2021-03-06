angular.module('mnAdmin').config(function ($stateProvider, $urlRouterProvider ) {

  $stateProvider
    .state('admin', {
      abstract: true,
      templateUrl: 'mn_admin/mn_admin.html',
      controller: 'mnAdminController',
      resolve: {
        mnAdminInitData: function ($q, mnAdminService) {
          return $q.all([
            mnAdminService.runDefaultPoolsDetailsLoop(),
            mnAdminService.getGroups()
          ]);
        }
      }
    })
    .state('admin.overview', {
      url: '/overview',
      controller: 'mnAdminOverviewController',
      templateUrl: 'mn_admin/overview/mn_admin_overview.html',
      authenticate: true
    })
    .state('admin.servers', {
      url: '/servers',
      controller: 'mnAdminServersController',
      templateUrl: 'mn_admin/servers/mn_admin_servers.html',
      authenticate: true,
      abstract: true
    })
    .state('admin.servers.list', {
      url: '/:list',
      authenticate: true,
      params: {
        list: {
          value: 'active',
        }
      },
      views: {
        "": {
          controller: 'mnAdminServersListController',
          templateUrl: 'mn_admin/servers/list/mn_admin_servers_list.html'
        },
        "item@admin.servers.list": {
          templateUrl: 'mn_admin/servers/list/item/mn_admin_servers_list_item.html',
          controller: 'mnAdminServersListItemController',
        },
        "item_details@admin.servers.list": {
          templateUrl: 'mn_admin/servers/list/item/details/mn_admin_servers_list_item_details.html',
          controller: 'mnAdminServersListItemDetailsController'
        }
      }
    })
    .state('admin.settings', {
      url: '/settings',
      abstract: true,
      controller: 'mnAdminSettingsController',
      templateUrl: 'mn_admin/settings/mn_admin_settings.html',
      authenticate: true
    })
    .state('admin.settings.cluster', {
      url: '/cluster',
      controller: 'mnAdminSettingsClusterController',
      templateUrl: 'mn_admin/settings/cluster/mn_admin_settings_cluster.html',
      resolve: {
        defaultCertificate: function (mnAdminSettingsClusterService) {
          return mnAdminSettingsClusterService.getDefaultCertificate();
        },
        getVisulaSettings: function (mnAdminSettingsClusterService) {
          return mnAdminSettingsClusterService.getVisulaSettings();
        }
      },
      authenticate: true
    });
});