%% @author Northscale <info@northscale.com>
%% @copyright 2009 NorthScale, Inc.
%% All rights reserved.

-module(ns_license).

-export([license/1, change_license/2]).

% {"0MEM-BASE-BETA-0001", %% A string or the atom undefined if no license.
%  true,                  %% Boolean whether the license is currently valid
%                         %% so this is false if license is invalid or expired.
%  {2010, 9, 15}          %% License is valid until this date, inclusive,
%                         %% in {Y, M, D} format, or the atoms forever or invalid.
% }
%
license(Node) ->
    %% TODO: License placeholder.
    %% We should read this out of a per-node-specific place in the ns_config.
    C = ns_config:get(),
    case ns_config:search_prop(C, {node, Node, license}, license) of
        undefined -> {undefined, false, invalid};
        License   -> {License, true, {2010, 9, 15}}
    end.

change_license(Node, "0MEM-BASE-BETA-0001" = License) ->
    ns_config:set({node, Node, license}, [{license, License}]),
    ok;

change_license(_Node, _L) ->
    %% TODO: License change placeholder.  Should validate it and save it if successful.
    {error, todo}.
