<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta charset="utf-8">
  <title>
  ufohunterscom / ufohunters-site 
  / source  / app / assets / javascripts / world / d3.geo.js
 &mdash; Bitbucket
</title>
  <link rel="icon" type="image/png" href="https://d3oaxc4q5k2d6q.cloudfront.net/m/4f5da60499c6/img/favicon.png">
  <meta id="bb-canon-url" name="bb-canon-url" content="https://bitbucket.org">
  
  
    
<link rel="stylesheet" href="https://d3oaxc4q5k2d6q.cloudfront.net/m/4f5da60499c6/compressed/css/ab5e999504f3.css" type="text/css" />
<link rel="stylesheet" href="https://d3oaxc4q5k2d6q.cloudfront.net/m/4f5da60499c6/compressed/css/570aa2514b7c.css" type="text/css" />

  
  <!--[if lt IE 9]><link rel="stylesheet" href="https://d3oaxc4q5k2d6q.cloudfront.net/m/4f5da60499c6//lib/aui/css/aui-ie.css" media="all"><![endif]-->
  <!--[if IE 9]><link rel="stylesheet" href="https://d3oaxc4q5k2d6q.cloudfront.net/m/4f5da60499c6//lib/aui/css/aui-ie9.css" media="all"><![endif]-->
  <!--[if IE]><link rel="stylesheet" href="https://d3oaxc4q5k2d6q.cloudfront.net/m/4f5da60499c6/css/aui-overrides-ie.css" media="all"><![endif]-->
  <meta name="description" content=""/>
  <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="Bitbucket" />
  
  
    <link href="/ufohunterscom/ufohunters-site/rss?token=db2f0402cf75485c30fba37a30c6e8c4" rel="alternate nofollow" type="application/rss+xml" title="RSS feed for ufohunters-site" />
  

<script type="text/javascript">var NREUMQ=NREUMQ||[];NREUMQ.push(["mark","firstbyte",new Date().getTime()]);</script></head>
<body class="production  aui-page-fixed"
      data-base-url="https://bitbucket.org"
      data-no-avatar-image="https://d3oaxc4q5k2d6q.cloudfront.net/m/4f5da60499c6/img/default_avatar/16/user_blue.png"
      data-current-user="{&quot;username&quot;: &quot;jcarlosgarcia&quot;, &quot;displayName&quot;: &quot;Jos\u00e9 Carlos Garc\u00eda&quot;, &quot;firstName&quot;: &quot;Jos\u00e9 Carlos&quot;, &quot;avatarUrl&quot;: &quot;https://secure.gravatar.com/avatar/ba8b3f8bd944706720b622d0147ea3ba?d=https%3A%2F%2Fd3oaxc4q5k2d6q.cloudfront.net%2Fm%2F4f5da60499c6%2Fimg%2Fdefault_avatar%2F32%2Fuser_blue.png&amp;s=32&quot;, &quot;lastName&quot;: &quot;Garc\u00eda&quot;, &quot;isTeam&quot;: false, &quot;isSshEnabled&quot;: false, &quot;isKbdShortcutsEnabled&quot;: true, &quot;id&quot;: 930876, &quot;isAuthenticated&quot;: true}"
      
      
       data-current-repo="{&quot;scm&quot;: &quot;git&quot;, &quot;readOnly&quot;: false, &quot;mainbranch&quot;: {&quot;name&quot;: &quot;master&quot;}, &quot;language&quot;: &quot;&quot;, &quot;creator&quot;: {&quot;username&quot;: &quot;ufohunterscom&quot;}, &quot;owner&quot;: {&quot;username&quot;: &quot;ufohunterscom&quot;, &quot;isTeam&quot;: true}, &quot;fullslug&quot;: &quot;ufohunterscom/ufohunters-site&quot;, &quot;slug&quot;: &quot;ufohunters-site&quot;, &quot;id&quot;: 2444443, &quot;pygmentsLanguage&quot;: null}"
       data-current-cset="8a649fb16334e69774ce4b35aae30c2be31469f5"
      
      
      
      >
<script type="text/javascript" src="https://d3oaxc4q5k2d6q.cloudfront.net/m/4f5da60499c6/compressed/js/7a107bcc2ab3.js"></script>

<div id="page">
  <div id="wrapper">
    
  


    <header id="header" role="banner">
      
  
    
  

      <nav class="aui-header aui-dropdown2-trigger-group" role="navigation">
        <div class="aui-header-inner">
          <div class="aui-header-primary">
            
  
    <div class="aui-header-before">
      <a class="aui-dropdown2-trigger app-switcher-trigger" aria-owns="app-switcher" aria-haspopup="true" tabindex="0" aria-controls="app-switcher">
        <span class="aui-icon aui-icon-small aui-iconfont-appswitcher">Linked applications</span>
      </a>
      
        <nav id="app-switcher" class="aui-dropdown2 aui-style-default aui-dropdown2-disable-active-class">
          <div class="aui-dropdown2-section blank-slate">
            <h2>Connect Bitbucket with other great Atlassian products:</h2>
            <dl>
              <dt class="jira">JIRA</dt>
              <dd>Project and issue tracking</dd>
              <dt class="confluence">Confluence</dt>
              <dd>Collaboration and content sharing</dd>
              <dt class="bamboo">Bamboo</dt>
              <dd>Continuous integration</dd>
            </dl>
            <a href="https://www.atlassian.com/ondemand/signup/?product=jira.ondemand,bitbucket.ondemand&utm_source=bitbucket&utm_medium=button&utm_campaign=app_switcher&utm_content=trial_button"
               class="aui-button aui-button-primary aui-style" target="_blank">Free trial</a>
            <a href="https://www.atlassian.com/software/ondemand/overview?utm_source=bitbucket&utm_medium=button&utm_campaign=app_switcher&utm_content=learn_more_button"
               class="aui-button aui-style" target="_blank">Learn more</a>
          </div>
        </nav>
      
    </div>
  

            
              <h1 class="aui-header-logo aui-header-logo-bitbucket " id="logo">
                <a href="/">
                  <span class="aui-header-logo-device">Bitbucket</span>
                </a>
              </h1>
            
            
  <script id="repo-dropdown-template" type="text/html">
  

[[#hasViewed]]
  <div class="aui-dropdown2-section">
    <strong class="viewed">Recently viewed</strong>
    <ul class="aui-list-truncate">
      [[#viewed]]
        <li class="[[#is_private]]private[[/is_private]][[^is_private]]public[[/is_private]] repository">
          <a href="[[url]]" title="[[owner]]/[[name]]" class=" aui-icon-container">
            <img class="repo-avatar size16" src="[[{avatar}]]" alt="[[owner]]/[[name]] avatar"/>
            [[owner]] / [[name]]
          </a>
        </li>
      [[/viewed]]
    </ul>
  </div>
[[/hasViewed]]
[[#hasUpdated]]
<div class="aui-dropdown2-section">
  <strong class="updated">Recently updated</strong>
  <ul class="aui-list-truncate">
    [[#updated]]
    <li class="[[#is_private]]private[[/is_private]][[^is_private]]public[[/is_private]] repository">
      <a href="[[url]]" title="[[owner]]/[[name]]" class=" aui-icon-container">
        <img class="repo-avatar size16" src="[[{avatar}]]" alt="[[owner]]/[[name]] avatar"/>
        [[owner]] / [[name]]
      </a>
    </li>
    [[/updated]]
  </ul>
</div>
[[/hasUpdated]]

</script>
  <ul class="aui-nav">
    
      
        <script id="team-dropdown-template" type="text/html">
  

<div class="aui-dropdown2-section primary">
  <ul class="aui-list-truncate">
    [[#teams]]
      <li>
        <a href="/[[username]]" class="aui-icon-container">
          <img class="avatar avatar16" src="[[avatar]]" alt="" width="16" height="16" />[[display_name]]
        </a>
      </li>
    [[/teams]]
  </ul>
</div>

<div class="aui-dropdown2-section">
  <ul>
    <li>
      <a href="/account/create-team/?team_source=header"
          data-modules="registration/create-team-link"
          id="create-team-link">Create team</a>
    </li>
  </ul>
</div>

</script>
        <li>
          <a class="aui-dropdown2-trigger" href="#" id="teams-dropdown-trigger"
            aria-owns="teams-dropdown" aria-haspopup="true">
            Teams
            <span class="aui-icon-dropdown"></span>
          </a>
          <div id="teams-dropdown" class="aui-dropdown2 aui-style-default">
            <div class="aui-dropdown2-section blank-slate">
              <p>Organize your team's work and supercharge repository administration.</p>
              <a class="aui-button aui-button-primary"
                href="/account/create-team/?team_source=menu_blank">
                Create team
              </a>
            </div>
          </div>
        </li>
      
      <li>
        <a class="aui-dropdown2-trigger selected"
           aria-owns="repo-dropdown" aria-haspopup="true" href="/repo/mine " id="repositories-dropdown-trigger">
          Repositories
          <span class="aui-icon-dropdown"></span>
        </a>
        <nav id="repo-dropdown" class="aui-dropdown2 aui-style-default">
          <div id="repo-dropdown-recent"></div>
          <div class="aui-dropdown2-section">
            <ul>
              <li>
                <a href="/repo/create" class="new-repository" id="create-repo-link">
                  Create repository
                </a>
              </li>
              <li>
                <a href="/repo/import" class="import-repository" id="import-repo-link">
                  Import repository
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </li>
      <li>
        <a class="aui-button aui-button-primary aui-style"
           href="/repo/create" id="repo-create-cta"
           title="Create repository">
          Create
        </a>
      </li>
    
  </ul>

          </div>
          <div class="aui-header-secondary">
            
  <ul role="menu" class="aui-nav">
    <li>
      <form action="/repo/all" method="get" class="aui-quicksearch">
        <label for="search-query" class="assistive">owner/repository</label>
        <input id="search-query" class="search" type="text" placeholder="owner/repository" name="name">
      </form>
    </li>
    <li>
      <a class="aui-dropdown2-trigger" aria-controls="header-help-dropdown" aria-owns="header-help-dropdown"
         aria-haspopup="true" data-container="#header .aui-header-inner" href="#header-help-dropdown">
        <span class="aui-icon aui-icon-small aui-iconfont-help">Help</span><span class="aui-icon-dropdown"></span>
      </a>
      <nav id="header-help-dropdown" class="aui-dropdown2 aui-style-default aui-dropdown2-in-header" aria-hidden="true">
        <div class="aui-dropdown2-section">
          <ul>
            <li>
              <a href="/whats-new" id="features-link">
                Latest features
              </a>
            </li>
          </ul>
        </div>
        <div class="aui-dropdown2-section">
          <ul>
            <li>
              <a class="support-ga"
                 data-support-gaq-page="DocumentationHome"
                 href="https://confluence.atlassian.com/x/bgozDQ"
                 target="_blank">
                Documentation
              </a>
            </li>
            <li>
              <a class="support-ga"
                 data-support-gaq-page="Documentation101"
                 href="https://confluence.atlassian.com/x/cgozDQ"
                 target="_blank">
                Bitbucket 101
              </a>
            </li>
            <li>
              <a class="support-ga"
                 data-support-gaq-page="DocumentationKB"
                 href="https://confluence.atlassian.com/x/2w4zDQ"
                 target="_blank">
                Knowledge base
              </a>
            </li>
          </ul>
        </div>
        <div class="aui-dropdown2-section">
          <ul>
            <li>
              <a class="support-ga"
                 data-support-gaq-page="Answers"
                 href="https://answers.atlassian.com/tags/bitbucket/"
                 target="_blank">
                Bitbucket on Atlassian Answers
              </a>
            </li>
            <li>
              <a class="support-ga"
                 data-support-gaq-page="Home"
                 href="/support">
              Support
            </a>
            </li>
          </ul>
        </div>
      </nav>
    </li>
      
        
      
    
      <li>
        <a class="aui-dropdown2-trigger"
           aria-owns="user-dropdown" aria-haspopup="true" data-container="#header .aui-header-inner"
           href="/jcarlosgarcia" title="jcarlosgarcia" id="user-dropdown-trigger">
          <div class="aui-avatar aui-avatar-small">
              <div class="aui-avatar-inner">
                  <img src="https://secure.gravatar.com/avatar/ba8b3f8bd944706720b622d0147ea3ba?d=https%3A%2F%2Fd3oaxc4q5k2d6q.cloudfront.net%2Fm%2F4f5da60499c6%2Fimg%2Fdefault_avatar%2F32%2Fuser_blue.png&amp;s=32" alt="Logged in as jcarlosgarcia" height="24" width="24" />
              </div>
          </div>
        </a>
        <nav id="user-dropdown" class="aui-dropdown2 aui-style-default" aria-hidden="true">
          <div class="aui-dropdown2-section">
            <ul>
              <li>
                <a href="/jcarlosgarcia" id="profile-link">View profile</a>
              </li>
              <li>
                <a href="/account/user/jcarlosgarcia/" id="account-link">Manage account</a>
              </li>
              <li>
                  <a href="/account/notifications/" id="inbox-link">Inbox <span id="inbox-unread-count"></span></a>
              </li>
              <li>
                <a href="#general-invite" class="general-invite-link" id="general-invite-dropdown">Invite a friend</a>
                <script id="general-invite-template" type="text/html">
  
<div id="general-invite">
  <form class="aui invitation-form" id="general-invite-form" method="post" novalidate>
    <div class="error aui-message hidden">
      <span class="aui-icon icon-error"></span>
      <div class="message"></div>
    </div>
    <div class="field-group">
      <label for="id_general_email_address">Email address</label>
      <input type="email" id="id_general_email_address" name="email-address" class="text">
    </div>
    
      <p class="field-group free-users" >
        
          <strong>Have questions?</strong> For every friend who joins Bitbucket, we'll
          <a href="http://blog.bitbucket.org/2012/09/18/refer-a-friend-to-bitbucket-for-free-users/" target="_blank">add 1 free user to your plan limit</a>.
          Earn up to 3 additional users.
        
      </p>
    
  </form>
</div>

</script>
                <script id="million-thanks-template" type="text/html">
  

<div id="million-thanks">
  <h1>Show off your Bitbucket love</h1>
  <p>
    
      Thanks for sharing Bitbucket! We'd like to extend a special offer to you.
      Get our million user shirt <strong>at cost ($10)</strong> from
      <a href="https://swag.atlassian.com" target="_blank">swag.atlassian.com</a>.
    
  </p>

  <h2>Coupon code:</h2>
  <div class="coupon-code">AHDC384AD</div>

  <div class="buttons-container">
    <div class="buttons">
      <a class="aui-button aui-button-primary aui-style" href="http://swag.atlassian.com/Product.aspx?ProductId=126" target="_blank">
        Get this shirt
      </a>
    </div>
  </div>
</div>

</script>
              </li>
            </ul>
          </div>
          <div class="aui-dropdown2-section">
            <ul>
              <li>
                <a href="/account/signout/">Log out</a>
              </li>
            </ul>
          </div>
        </nav>
      </li>
    
  </ul>

          </div>
        </div>
      </nav>
    </header>

    
  <header id="account-warning" role="banner"
          class="aui-message-banner warning
                ">
    <div class="aui-message-banner-inner">
      <span class="aui-icon aui-icon-warning"></span>
      <span class="message">
        
      </span>
    </div>
  </header>

    
    
      <header id="aui-message-bar">
        
      </header>
    


    <div id="content" role="main">
      
  <header id="repo-warning" role="banner" class="aui-message-banner warning">
    <div class="aui-message-banner-inner">
      <span class="aui-icon aui-icon-warning"></span>
      <span class="message">
      </span>
    </div>
  </header>
  <script id="repo-warning-template" type="text/html">
  




  This repository's ownership is pending transfer to <a href="/[[username]]">[[username]]</a>.
  Visit the <a href="/ufohunterscom/ufohunters-site/admin/transfer">transfer repository page</a> to view more details.


</script>
  <header id="repo-header" class="aui-page-header" data-modules="repo/index">
    <div class="aui-page-header-inner">
      <div class="aui-page-header-image">
        <span class="aui-avatar aui-avatar-xlarge aui-avatar-project">
          <span class="aui-avatar-inner">
            <a class="repo-avatar-link" href="/ufohunterscom/ufohunters-site">
               <span class="repo-avatar-container size64" title="ufohunterscom/ufohunters-site">
  <img alt="ufohunterscom/ufohunters-site" src="https://d3oaxc4q5k2d6q.cloudfront.net/m/4f5da60499c6/img/language-avatars/default_64.png">
</span>

              
                <span class="locked" title="Private repository">
                  <span class="aui-icon aui-icon-small aui-iconfont-locked">Private repository</span>
                </span>
              
            </a>
          </span>
        </span>
      </div>
      <div class="aui-page-header-main">
        <h1><a class="repo-link" href="/ufohunterscom/ufohunters-site">ufohunters-site</a></h1>
        <ul class="repo-metadata clearfix">
          <li>
            <a class="user" href="/ufohunterscom">
              <span class="aui-icon aui-icon-small aui-iconfont-user">User icon</span>
              <span>ufohunterscom</span>
            </a>
          </li>
          
          
          
          <li class="social">
            <a class="share" href="#share" id="repo-share-link" data-modules="repo/share"
              
                
                  data-team-name="ufohunterscom" data-team-avatar="https://secure.gravatar.com/avatar/e74bbd8c087fe6d2971268be49975803?d=https%3A%2F%2Fd3oaxc4q5k2d6q.cloudfront.net%2Fm%2F4f5da60499c6%2Fimg%2Fdefault_team_avatar%2F32%2Fteam_blue.png&amp;s=32" data-team-display="ufo-hunters.com"
                  data-team-manage-link="/account/user/ufohunterscom/groups/"
                >
              
              <span class="aui-icon aui-icon-small aui-iconfont-email"></span>
              <span>Share</span>
            </a>
            <script id="share-repo-template" type="text/html">
  

<div class="clearfix">
   <span class="repo-avatar-container size32" title="ufohunterscom/ufohunters-site">
  <img alt="ufohunterscom/ufohunters-site" src="https://d3oaxc4q5k2d6q.cloudfront.net/m/4f5da60499c6/img/language-avatars/default_32.png">
</span>

  <span class="repo-name-container">
    ufohunterscom / ufohunters-site
  </span>
</div>
<p class="helptext">
  
    Existing users are granted access to this repository immediately.
    New users will be sent an invitation.
  
</p>
<div class="manage-repo-link"
  data-manage-link="/ufohunterscom/ufohunters-site/admin/access"></div>
<div class="share-form"></div>

</script>
            <script id="share-dialog-template" type="text/html">
  <div class="aui-tabs horizontal-tabs">
  <ul class="tabs-menu">
    [[#panels]]
      <li class="menu-item">
        <a href="#[[tabId]]"><strong>[[display]]</strong></a>
      </li>
    [[/panels]]
  </ul>
  [[#panels]]
    <div class="tabs-pane" id="[[tabId]]"></div>
  [[/panels]]
</div>

</script>
          </li>
          
        </ul>
      </div>
      <div id="repo-toolbar" class="aui-page-header-actions">
        
          <div class="aui-buttons">
            <a id="repo-clone-button" class="aui-button"
              href="https://jcarlosgarcia@bitbucket.org/ufohunterscom/ufohunters-site.git">
              <span class="aui-icon aui-icon-small aui-iconfont-devtools-clone"></span>
              <span>Clone</span>
              <span class="aui-icon-dropdown"></span>
            </a>
            
              <a id="branch-button" class="aui-button create-branch-button"
                 data-modules="repo/create-branch"
                 href="/ufohunterscom/ufohunters-site/branch">
                 <span class="aui-icon aui-icon-small aui-iconfont-devtools-branch">Pull request icon</span>
                <span>Branch</span>
              </a>
              <a id="pull-request-button" class="aui-button"
                 href="/ufohunterscom/ufohunters-site/pull-request/new">
                <span class="aui-icon aui-icon-small aui-iconfont-devtools-pull-request"></span>
                <span>Pull request</span>
              </a>
              <button class="aui-button aui-dropdown2-trigger aui-dropdown2-trigger-more forks-enabled"
                 id="repo-more-actions-button"
                 aria-owns="repo-more-dropdown" aria-haspopup="true">
                <span class="aui-icon aui-icon-small aui-iconfont-more">More</span>
              </button>
            
          </div>
        
        
          
            

<div class="aui-buttons repo-watch">
  <a class="aui-button aui-style follow following" rel="nofollow"
    href="/ufohunterscom/ufohunters-site/follow"
    
      title="Stop watching this repository"
    
    data-prefs-url="/xhr/watch-prefs/ufohunterscom/ufohunters-site"
    data-unwatch-url="/api/1.0/repositories/unwatch/ufohunterscom/ufohunters-site"
    data-url-pullrequests="/dashboard/pullrequests/watching"
    data-url-issues="/dashboard/issues/watching"
    data-repository="ufohunterscom/ufohunters-site">
    <span class="icon watch text">Watch</span>
  </a>
  <a href="#repo-preferences" class="aui-button aui-style repo-watch">
    <span class="aui-icon-dropdown"></span>
  </a>
</div>

          
          <script id="watch-preferences-template" type="text/html">
  
<div id="repo-watch-preferences" class="repo-watch-container">
  <div class="row">
    <div class="content">
      <span class="aui-icon aui-icon-large aui-iconfont-view img-icon"></span>
      [[#watching]]
        <h2>
          You are watching this repository
        </h2>
        <p>
          
          
            Updates will appear in your <a href="/dashboard/overview">newsfeed</a>.
          
        </p>
      [[/watching]]
      [[^watching]]
        <h2>
          You are not watching this repository
        </h2>
        <p>
          Start watching to receive updates.
        </p>
      [[/watching]]
      <p>
        <a class="aui-button aui-style follow following"
          data-follow-text="Stop watching" href="#">
          [[#watching]]
            Stop watching
          [[/watching]]
          [[^watching]]
            Watch this repository
          [[/watching]]
        </a>
      </p>
    </div>
  </div>
  <div class="row">
    <div class="content"
      [[^watching]] title="You must watch this repository before you can subscribe to its notifications"[[/watching]]>
      <span class="aui-icon aui-icon-large aui-iconfont-email img-icon"></span>
      <h4 class="subscribe-title">
        Subscribe to notifications about
      </h4>
      [[#showRepo]]
        <div class="checkbox">
          <input type="checkbox" id="pref-pullrequests" name="pullrequests" [[#pullrequests]]checked[[/pullrequests]]/>
          <label for="pref-pullrequests">All pull requests</label>
        </div>
      [[/showRepo]]
      [[#showIssues]]
        <div class="checkbox">
          <input type="checkbox" id="pref-issues" name="issues" [[#issues]]checked[[/issues]]/>
          <label for="pref-issues">All issues</label>
        </div>
      [[/showIssues]]
      [[#showRepo]]
        <div class="checkbox">
          <input type="checkbox" id="pref-commits" name="commits" [[#commits]]checked[[/commits]]/>
          <label for="pref-commits">All commits</label>
        </div>
      [[/showRepo]]
      [[#showWiki]]
        <div class="checkbox">
          <input type="checkbox" id="pref-wiki" name="wiki" [[#wiki]]checked[[/wiki]]/>
          <label for="pref-wiki">All wiki changes</label>
        </div>
      [[/showWiki]]
      [[#showRepo]]
        <div class="checkbox">
          <input type="checkbox" id="pref-forks" name="forks" [[#forks]]checked[[/forks]]/>
          <label for="pref-forks">All forks</label>
        </div>
      [[/showRepo]]
    </div>
  </div>
</div>

</script>
          <script id="stop-watching-template" type="text/html">
  

<div id="stop-watching-container"
  data-manage-all-url="/account/user/jcarlosgarcia/notifications/">
  <p>
    
      You may still get notifications from previously watched items in this
      repository unless you unwatch them.
    
  </p>
  <ul class="watching">
    [[#pr_count]]
      <li>
        <a href="[[urlPullrequests]]">Pull requests</a>
        <span class="aui-badge">[[pr_count]]</span>
        <a class="unwatch" href="#unwatch-pullrequests" data-kind="pullrequest">
          Unwatch
        </a>
      </li>
    [[/pr_count]]
    [[#issue_count]]
      <li>
        <a href="[[urlIssues]]">Issues</a>
        <span class="aui-badge">[[issue_count]]</span>
        <a class="unwatch" href="#unwatch-issues" data-kind="issues">
          Unwatch
        </a>
      </li>
    [[/issue_count]]
  </ul>
</div>

</script>
          <script id="preference-error-template" type="text/html">
  
<div class="aui-message error repo-watch">
  <p>An error has occurred.</p>
  <span class="aui-icon aui-icon-small aui-iconfont-error"></span>
</div>

</script>
        
        

<div id="repo-clone-dialog" class="clone-dialog hidden">
  
<div class="clone-url">
  <div class="aui-buttons">
    <a href="https://jcarlosgarcia@bitbucket.org/ufohunterscom/ufohunters-site.git"
       class="aui-button aui-style aui-dropdown2-trigger" aria-haspopup="true"
       aria-owns="clone-url-dropdown-header">
      <span class="dropdown-text">HTTPS</span>
    </a>
    <div id="clone-url-dropdown-header" class="aui-dropdown2 aui-style-default">
      <ul class="aui-list-truncate">
        <li>
          <a href="https://jcarlosgarcia@bitbucket.org/ufohunterscom/ufohunters-site.git"
            
              data-command="git clone https://jcarlosgarcia@bitbucket.org/ufohunterscom/ufohunters-site.git"
            
            class="item-link https">HTTPS
          </a>
        </li>
        <li>
          <a href="ssh://git@bitbucket.org/ufohunterscom/ufohunters-site.git"
            
              data-command="git clone git@bitbucket.org:ufohunterscom/ufohunters-site.git"
            
            class="item-link ssh">SSH
          </a>
        </li>
      </ul>
    </div>
    <input type="text" readonly="readonly" value="git clone https://jcarlosgarcia@bitbucket.org/ufohunterscom/ufohunters-site.git">
  </div>
  
  <p>Need help cloning? Visit
     <a href="https://confluence.atlassian.com/x/cgozDQ" target="_blank">Bitbucket 101</a>.</p>
  
</div>


  
  
  

<div class="sourcetree-callout clone-in-sourcetree"
  data-https-url="https://jcarlosgarcia@bitbucket.org/ufohunterscom/ufohunters-site.git"
  data-ssh-url="ssh://git@bitbucket.org/ufohunterscom/ufohunters-site.git">

  <div>
    <button class="aui-button aui-style aui-button-primary">
      
        Clone in SourceTree
      
    </button>
  </div>

  <p class="windows-text">
      
        <a href="http://www.sourcetreeapp.com/?utm_source=internal&amp;utm_medium=link&amp;utm_campaign=clone_repo_win" target="_blank">Atlassian SourceTree</a>
        is a free Git and Mercurial client for Windows.
      
  </p>
  <p class="mac-text">
      
        <a href="http://www.sourcetreeapp.com/?utm_source=internal&amp;utm_medium=link&amp;utm_campaign=clone_repo_mac" target="_blank">Atlassian SourceTree</a>
        is a free Git and Mercurial client for Mac.
      
  </p>
</div>

  
</div>

        <div id="repo-more-dropdown" class="aui-dropdown2 aui-style-default">
          <ul>
            <li>
              <a id="compare-button"
                 
                   href="/ufohunterscom/ufohunters-site/branches/compare">
                 
                Compare
              </a>
            </li>
            
              <li>
                <a id="fork-button" href="/ufohunterscom/ufohunters-site/fork">
                  Fork
                </a>
              </li>
            
          </ul>
        </div>
        
          <div class="hidden kb-shortcut-actions">
            <a id="repo-create-issue" href="/ufohunterscom/ufohunters-site/issues/new"></a>
          </div>
        
      </div>
    </div>
    <div class="clearfix"></div>
  </header>
  <nav id="repo-tabs" class="aui-navgroup aui-navgroup-horizontal aui-navgroup-horizontal-roomy">
    <div class="aui-navgroup-inner">
      <div class="aui-navgroup-primary">
        <ul class="aui-nav">
          
            <li>
              <a href="/ufohunterscom/ufohunters-site/overview" id="repo-overview-link">Overview</a>
            </li>
          
          
            <li class="aui-nav-selected">
              <a href="/ufohunterscom/ufohunters-site/src" id="repo-source-link">Source</a>
            </li>
          
          
            <li>
              <a href="/ufohunterscom/ufohunters-site/commits" id="repo-commits-link">
                Commits
              </a>
            </li>
          
          
            <li>
              <a href="/ufohunterscom/ufohunters-site/branches" id="repo-branches-link">
                Branches
              </a>
            </li>
          
          
            <li>
              <a href="/ufohunterscom/ufohunters-site/pull-requests" id="repo-pullrequests-link">
                Pull requests
                
                  
                
              </a>
            </li>
          
          
            
          
            <li id="issues-tab" class="
              
                
              
            ">
              <a href="/ufohunterscom/ufohunters-site/issues?status=new&amp;status=open" id="repo-issues-link">
                Issues
                
                  
                    <span class="aui-badge">10</span>
                  
                
              </a>
            </li>
            <li id="wiki-tab" class="
                
                  hidden
                
              ">
              <a href="/ufohunterscom/ufohunters-site/wiki" id="repo-wiki-link">Wiki</a>
            </li>
          
            <li>
            <a href="/ufohunterscom/ufohunters-site/downloads" id="repo-downloads-link">
              Downloads
              
                
              
            </a>
            </li>
          
        </ul>
      </div>
      <div class="aui-navgroup-secondary">
        <ul class="aui-nav">
          
            <li id="admin-tab">
              <a href="/ufohunterscom/ufohunters-site/admin"
                  id="repo-admin-link" title="Administration">
                  <span class="aui-icon aui-icon-small aui-iconfont-configure">Administration</span>
              </a>
            </li>
          
        </ul>
      </div>
    </div>
  </nav>

      
  <div class="aui-page-panel">
    <div class="aui-page-panel-inner">
      <div id="repo-content" class="aui-page-panel-content">
        
  <div id="source-container" data-modules="repo/source/index">
    



<header id="source-path">
  
  <div class="labels labels-csv">
    
      <div class="aui-buttons">
        <button data-branches-tags-url="/api/1.0/repositories/ufohunterscom/ufohunters-site/branches-tags"
                data-modules="components/branch-dialog"
                class="aui-button branch-dialog-trigger" title="v1_stable">
          
            
              <span class="aui-icon aui-icon-small aui-iconfont-devtools-branch">Branch</span>
            
            <span class="name">v1_stable</span>
          
          <span class="aui-icon-dropdown"></span>
        </button>
        <button class="aui-button" id="checkout-branch-button"
                title="Check out this branch">
          <span class="aui-icon aui-icon-small aui-iconfont-devtools-clone">Check out branch</span>
          <span class="aui-icon-dropdown"></span>
        </button>
      </div>
      <script id="branch-checkout-template" type="text/html">
  

<div id="checkout-branch-contents">
  <div class="command-line">
    <p>
      Check out this branch on your local machine to begin working on it.
    </p>
    <input type="text" class="checkout-command" readonly="readonly"
        
           value="git fetch && git checkout [[branchName]]"
        
        >
  </div>
  
    

<div class="sourcetree-callout clone-in-sourcetree"
  data-https-url="https://jcarlosgarcia@bitbucket.org/ufohunterscom/ufohunters-site.git"
  data-ssh-url="ssh://git@bitbucket.org/ufohunterscom/ufohunters-site.git">

  <div>
    <button class="aui-button aui-style aui-button-primary">
      
        Check out in SourceTree
      
    </button>
  </div>

  <p class="windows-text">
      
        <a href="http://www.sourcetreeapp.com/?utm_source=internal&amp;utm_medium=link&amp;utm_campaign=clone_repo_win" target="_blank">Atlassian SourceTree</a>
        is a free Git and Mercurial client for Windows.
      
  </p>
  <p class="mac-text">
      
        <a href="http://www.sourcetreeapp.com/?utm_source=internal&amp;utm_medium=link&amp;utm_campaign=clone_repo_mac" target="_blank">Atlassian SourceTree</a>
        is a free Git and Mercurial client for Mac.
      
  </p>
</div>

  
</div>
</script>
    
  </div>
  
  
    <div class="view-switcher">
      <div class="aui-buttons">
        
          <a href="/ufohunterscom/ufohunters-site/src/8a649fb16334/app/assets/javascripts/world/d3.geo.js?at=v1_stable"
             class="aui-button aui-style pjax-trigger" aria-pressed="true">
            Source
          </a>
          <a href="/ufohunterscom/ufohunters-site/diff/app/assets/javascripts/world/d3.geo.js?diff2=8a649fb16334&at=v1_stable"
             class="aui-button aui-style pjax-trigger"
             title="Diff to previous change">
            Diff
          </a>
          <a href="/ufohunterscom/ufohunters-site/history-node/8a649fb16334/app/assets/javascripts/world/d3.geo.js?at=v1_stable"
             class="aui-button aui-style pjax-trigger">
            History
          </a>
        
      </div>
    </div>
  
  <h1>
    <a href="/ufohunterscom/ufohunters-site/src/8a649fb16334?at=v1_stable"
       class="pjax-trigger" title="ufohunterscom/ufohunters-site at 8a649fb16334">ufohunters-site</a> /
    
      
        
          
            <a href="/ufohunterscom/ufohunters-site/src/8a649fb16334/app/?at=v1_stable"
               class="pjax-trigger">app</a> /
          
        
      
    
      
        
          
            <a href="/ufohunterscom/ufohunters-site/src/8a649fb16334/app/assets/?at=v1_stable"
               class="pjax-trigger">assets</a> /
          
        
      
    
      
        
          
            <a href="/ufohunterscom/ufohunters-site/src/8a649fb16334/app/assets/javascripts/?at=v1_stable"
               class="pjax-trigger">javascripts</a> /
          
        
      
    
      
        
          
            <a href="/ufohunterscom/ufohunters-site/src/8a649fb16334/app/assets/javascripts/world/?at=v1_stable"
               class="pjax-trigger">world</a> /
          
        
      
    
      
        
          <span>d3.geo.js</span>
        
      
    
  </h1>
  
    
    
  
  <div class="clearfix"></div>
</header>


    <div id="editor-container" class="maskable"
         data-owner="ufohunterscom"
         data-slug="ufohunters-site"
         data-is-writer="true"
         data-has-push-access="true"
         data-hash="8a649fb16334e69774ce4b35aae30c2be31469f5"
         data-branch="v1_stable"
         data-path="app/assets/javascripts/world/d3.geo.js"
         data-source-url="/api/1.0/repositories/ufohunterscom/ufohunters-site/src/8a649fb16334e69774ce4b35aae30c2be31469f5/app/assets/javascripts/world/d3.geo.js">
      <div id="source-view" data-modules="repo/source/view-file">
        <div class="toolbar">
          <div class="primary">
            <div class="aui-buttons">
              
                <button id="file-history-trigger" class="aui-button aui-style changeset-info"
                        data-changeset="8a649fb16334e69774ce4b35aae30c2be31469f5"
                        data-path="app/assets/javascripts/world/d3.geo.js"
                        data-current="8a649fb16334e69774ce4b35aae30c2be31469f5">
                  
                     

<img class="avatar avatar16" src="https://secure.gravatar.com/avatar/ba8b3f8bd944706720b622d0147ea3ba?d=https%3A%2F%2Fd3oaxc4q5k2d6q.cloudfront.net%2Fm%2F4f5da60499c6%2Fimg%2Fdefault_avatar%2F16%2Fuser_blue.png&amp;s=16" alt="José Carlos García avatar" />
<span class="changeset-hash">8a649fb</span>
<time datetime="2014-01-15T22:39:26+00:00" class="timestamp"></time>
<span class="aui-icon-dropdown"></span>

                  
                </button>
              
            </div>
          <a href="/ufohunterscom/ufohunters-site/full-commit/8a649fb16334/app/assets/javascripts/world/d3.geo.js" id="full-commit-link"
              title="View full commit 8a649fb">Full commit</a>
          </div>
            <div class="secondary">
              <div class="aui-buttons">
                
                  <a href="/ufohunterscom/ufohunters-site/annotate/8a649fb16334e69774ce4b35aae30c2be31469f5/app/assets/javascripts/world/d3.geo.js?at=v1_stable"
                  class="aui-button aui-style pjax-trigger">Blame</a>
                
                
                <a href="/ufohunterscom/ufohunters-site/raw/8a649fb16334e69774ce4b35aae30c2be31469f5/app/assets/javascripts/world/d3.geo.js"
                  class="aui-button aui-style">Raw</a>
              </div>
              
                <div class="aui-buttons">
                  
                  <button class="edit-button aui-button aui-style">Edit</button>
                </div>
              
            </div>
          <div class="clearfix"></div>
        </div>

        
          
            
              
                <div class="file-source">
                  <table class="highlighttable"><tr><td class="linenos"><div class="linenodiv"><pre><a href="#cl-1">  1</a>
<a href="#cl-2">  2</a>
<a href="#cl-3">  3</a>
<a href="#cl-4">  4</a>
<a href="#cl-5">  5</a>
<a href="#cl-6">  6</a>
<a href="#cl-7">  7</a>
<a href="#cl-8">  8</a>
<a href="#cl-9">  9</a>
<a href="#cl-10"> 10</a>
<a href="#cl-11"> 11</a>
<a href="#cl-12"> 12</a>
<a href="#cl-13"> 13</a>
<a href="#cl-14"> 14</a>
<a href="#cl-15"> 15</a>
<a href="#cl-16"> 16</a>
<a href="#cl-17"> 17</a>
<a href="#cl-18"> 18</a>
<a href="#cl-19"> 19</a>
<a href="#cl-20"> 20</a>
<a href="#cl-21"> 21</a>
<a href="#cl-22"> 22</a>
<a href="#cl-23"> 23</a>
<a href="#cl-24"> 24</a>
<a href="#cl-25"> 25</a>
<a href="#cl-26"> 26</a>
<a href="#cl-27"> 27</a>
<a href="#cl-28"> 28</a>
<a href="#cl-29"> 29</a>
<a href="#cl-30"> 30</a>
<a href="#cl-31"> 31</a>
<a href="#cl-32"> 32</a>
<a href="#cl-33"> 33</a>
<a href="#cl-34"> 34</a>
<a href="#cl-35"> 35</a>
<a href="#cl-36"> 36</a>
<a href="#cl-37"> 37</a>
<a href="#cl-38"> 38</a>
<a href="#cl-39"> 39</a>
<a href="#cl-40"> 40</a>
<a href="#cl-41"> 41</a>
<a href="#cl-42"> 42</a>
<a href="#cl-43"> 43</a>
<a href="#cl-44"> 44</a>
<a href="#cl-45"> 45</a>
<a href="#cl-46"> 46</a>
<a href="#cl-47"> 47</a>
<a href="#cl-48"> 48</a>
<a href="#cl-49"> 49</a>
<a href="#cl-50"> 50</a>
<a href="#cl-51"> 51</a>
<a href="#cl-52"> 52</a>
<a href="#cl-53"> 53</a>
<a href="#cl-54"> 54</a>
<a href="#cl-55"> 55</a>
<a href="#cl-56"> 56</a>
<a href="#cl-57"> 57</a>
<a href="#cl-58"> 58</a>
<a href="#cl-59"> 59</a>
<a href="#cl-60"> 60</a>
<a href="#cl-61"> 61</a>
<a href="#cl-62"> 62</a>
<a href="#cl-63"> 63</a>
<a href="#cl-64"> 64</a>
<a href="#cl-65"> 65</a>
<a href="#cl-66"> 66</a>
<a href="#cl-67"> 67</a>
<a href="#cl-68"> 68</a>
<a href="#cl-69"> 69</a>
<a href="#cl-70"> 70</a>
<a href="#cl-71"> 71</a>
<a href="#cl-72"> 72</a>
<a href="#cl-73"> 73</a>
<a href="#cl-74"> 74</a>
<a href="#cl-75"> 75</a>
<a href="#cl-76"> 76</a>
<a href="#cl-77"> 77</a>
<a href="#cl-78"> 78</a>
<a href="#cl-79"> 79</a>
<a href="#cl-80"> 80</a>
<a href="#cl-81"> 81</a>
<a href="#cl-82"> 82</a>
<a href="#cl-83"> 83</a>
<a href="#cl-84"> 84</a>
<a href="#cl-85"> 85</a>
<a href="#cl-86"> 86</a>
<a href="#cl-87"> 87</a>
<a href="#cl-88"> 88</a>
<a href="#cl-89"> 89</a>
<a href="#cl-90"> 90</a>
<a href="#cl-91"> 91</a>
<a href="#cl-92"> 92</a>
<a href="#cl-93"> 93</a>
<a href="#cl-94"> 94</a>
<a href="#cl-95"> 95</a>
<a href="#cl-96"> 96</a>
<a href="#cl-97"> 97</a>
<a href="#cl-98"> 98</a>
<a href="#cl-99"> 99</a>
<a href="#cl-100">100</a>
<a href="#cl-101">101</a>
<a href="#cl-102">102</a>
<a href="#cl-103">103</a>
<a href="#cl-104">104</a>
<a href="#cl-105">105</a>
<a href="#cl-106">106</a>
<a href="#cl-107">107</a>
<a href="#cl-108">108</a>
<a href="#cl-109">109</a>
<a href="#cl-110">110</a>
<a href="#cl-111">111</a>
<a href="#cl-112">112</a>
<a href="#cl-113">113</a>
<a href="#cl-114">114</a>
<a href="#cl-115">115</a>
<a href="#cl-116">116</a>
<a href="#cl-117">117</a>
<a href="#cl-118">118</a>
<a href="#cl-119">119</a>
<a href="#cl-120">120</a>
<a href="#cl-121">121</a>
<a href="#cl-122">122</a>
<a href="#cl-123">123</a>
<a href="#cl-124">124</a>
<a href="#cl-125">125</a>
<a href="#cl-126">126</a>
<a href="#cl-127">127</a>
<a href="#cl-128">128</a>
<a href="#cl-129">129</a>
<a href="#cl-130">130</a>
<a href="#cl-131">131</a>
<a href="#cl-132">132</a>
<a href="#cl-133">133</a>
<a href="#cl-134">134</a>
<a href="#cl-135">135</a>
<a href="#cl-136">136</a>
<a href="#cl-137">137</a>
<a href="#cl-138">138</a>
<a href="#cl-139">139</a>
<a href="#cl-140">140</a>
<a href="#cl-141">141</a>
<a href="#cl-142">142</a>
<a href="#cl-143">143</a>
<a href="#cl-144">144</a>
<a href="#cl-145">145</a>
<a href="#cl-146">146</a>
<a href="#cl-147">147</a>
<a href="#cl-148">148</a>
<a href="#cl-149">149</a>
<a href="#cl-150">150</a>
<a href="#cl-151">151</a>
<a href="#cl-152">152</a>
<a href="#cl-153">153</a>
<a href="#cl-154">154</a>
<a href="#cl-155">155</a>
<a href="#cl-156">156</a>
<a href="#cl-157">157</a>
<a href="#cl-158">158</a>
<a href="#cl-159">159</a>
<a href="#cl-160">160</a>
<a href="#cl-161">161</a>
<a href="#cl-162">162</a>
<a href="#cl-163">163</a>
<a href="#cl-164">164</a>
<a href="#cl-165">165</a>
<a href="#cl-166">166</a>
<a href="#cl-167">167</a>
<a href="#cl-168">168</a>
<a href="#cl-169">169</a>
<a href="#cl-170">170</a>
<a href="#cl-171">171</a>
<a href="#cl-172">172</a>
<a href="#cl-173">173</a>
<a href="#cl-174">174</a>
<a href="#cl-175">175</a>
<a href="#cl-176">176</a>
<a href="#cl-177">177</a>
<a href="#cl-178">178</a>
<a href="#cl-179">179</a>
<a href="#cl-180">180</a>
<a href="#cl-181">181</a>
<a href="#cl-182">182</a>
<a href="#cl-183">183</a>
<a href="#cl-184">184</a>
<a href="#cl-185">185</a>
<a href="#cl-186">186</a>
<a href="#cl-187">187</a>
<a href="#cl-188">188</a>
<a href="#cl-189">189</a>
<a href="#cl-190">190</a>
<a href="#cl-191">191</a>
<a href="#cl-192">192</a>
<a href="#cl-193">193</a>
<a href="#cl-194">194</a>
<a href="#cl-195">195</a>
<a href="#cl-196">196</a>
<a href="#cl-197">197</a>
<a href="#cl-198">198</a>
<a href="#cl-199">199</a>
<a href="#cl-200">200</a>
<a href="#cl-201">201</a>
<a href="#cl-202">202</a>
<a href="#cl-203">203</a>
<a href="#cl-204">204</a>
<a href="#cl-205">205</a>
<a href="#cl-206">206</a>
<a href="#cl-207">207</a>
<a href="#cl-208">208</a>
<a href="#cl-209">209</a>
<a href="#cl-210">210</a>
<a href="#cl-211">211</a>
<a href="#cl-212">212</a>
<a href="#cl-213">213</a>
<a href="#cl-214">214</a>
<a href="#cl-215">215</a>
<a href="#cl-216">216</a>
<a href="#cl-217">217</a>
<a href="#cl-218">218</a>
<a href="#cl-219">219</a>
<a href="#cl-220">220</a>
<a href="#cl-221">221</a>
<a href="#cl-222">222</a>
<a href="#cl-223">223</a>
<a href="#cl-224">224</a>
<a href="#cl-225">225</a>
<a href="#cl-226">226</a>
<a href="#cl-227">227</a>
<a href="#cl-228">228</a>
<a href="#cl-229">229</a>
<a href="#cl-230">230</a>
<a href="#cl-231">231</a>
<a href="#cl-232">232</a>
<a href="#cl-233">233</a>
<a href="#cl-234">234</a>
<a href="#cl-235">235</a>
<a href="#cl-236">236</a>
<a href="#cl-237">237</a>
<a href="#cl-238">238</a>
<a href="#cl-239">239</a>
<a href="#cl-240">240</a>
<a href="#cl-241">241</a>
<a href="#cl-242">242</a>
<a href="#cl-243">243</a>
<a href="#cl-244">244</a>
<a href="#cl-245">245</a>
<a href="#cl-246">246</a>
<a href="#cl-247">247</a>
<a href="#cl-248">248</a>
<a href="#cl-249">249</a>
<a href="#cl-250">250</a>
<a href="#cl-251">251</a>
<a href="#cl-252">252</a>
<a href="#cl-253">253</a>
<a href="#cl-254">254</a>
<a href="#cl-255">255</a>
<a href="#cl-256">256</a>
<a href="#cl-257">257</a>
<a href="#cl-258">258</a>
<a href="#cl-259">259</a>
<a href="#cl-260">260</a>
<a href="#cl-261">261</a>
<a href="#cl-262">262</a>
<a href="#cl-263">263</a>
<a href="#cl-264">264</a>
<a href="#cl-265">265</a>
<a href="#cl-266">266</a>
<a href="#cl-267">267</a>
<a href="#cl-268">268</a>
<a href="#cl-269">269</a>
<a href="#cl-270">270</a>
<a href="#cl-271">271</a>
<a href="#cl-272">272</a>
<a href="#cl-273">273</a>
<a href="#cl-274">274</a>
<a href="#cl-275">275</a>
<a href="#cl-276">276</a>
<a href="#cl-277">277</a>
<a href="#cl-278">278</a>
<a href="#cl-279">279</a>
<a href="#cl-280">280</a>
<a href="#cl-281">281</a>
<a href="#cl-282">282</a>
<a href="#cl-283">283</a>
<a href="#cl-284">284</a>
<a href="#cl-285">285</a>
<a href="#cl-286">286</a>
<a href="#cl-287">287</a>
<a href="#cl-288">288</a>
<a href="#cl-289">289</a>
<a href="#cl-290">290</a>
<a href="#cl-291">291</a>
<a href="#cl-292">292</a>
<a href="#cl-293">293</a>
<a href="#cl-294">294</a>
<a href="#cl-295">295</a>
<a href="#cl-296">296</a>
<a href="#cl-297">297</a>
<a href="#cl-298">298</a>
<a href="#cl-299">299</a>
<a href="#cl-300">300</a>
<a href="#cl-301">301</a>
<a href="#cl-302">302</a>
<a href="#cl-303">303</a>
<a href="#cl-304">304</a>
<a href="#cl-305">305</a>
<a href="#cl-306">306</a>
<a href="#cl-307">307</a>
<a href="#cl-308">308</a>
<a href="#cl-309">309</a>
<a href="#cl-310">310</a>
<a href="#cl-311">311</a>
<a href="#cl-312">312</a>
<a href="#cl-313">313</a>
<a href="#cl-314">314</a>
<a href="#cl-315">315</a>
<a href="#cl-316">316</a>
<a href="#cl-317">317</a>
<a href="#cl-318">318</a>
<a href="#cl-319">319</a>
<a href="#cl-320">320</a>
<a href="#cl-321">321</a>
<a href="#cl-322">322</a>
<a href="#cl-323">323</a>
<a href="#cl-324">324</a>
<a href="#cl-325">325</a>
<a href="#cl-326">326</a>
<a href="#cl-327">327</a>
<a href="#cl-328">328</a>
<a href="#cl-329">329</a>
<a href="#cl-330">330</a>
<a href="#cl-331">331</a>
<a href="#cl-332">332</a>
<a href="#cl-333">333</a>
<a href="#cl-334">334</a>
<a href="#cl-335">335</a>
<a href="#cl-336">336</a>
<a href="#cl-337">337</a>
<a href="#cl-338">338</a>
<a href="#cl-339">339</a>
<a href="#cl-340">340</a>
<a href="#cl-341">341</a>
<a href="#cl-342">342</a>
<a href="#cl-343">343</a>
<a href="#cl-344">344</a>
<a href="#cl-345">345</a>
<a href="#cl-346">346</a>
<a href="#cl-347">347</a>
<a href="#cl-348">348</a>
<a href="#cl-349">349</a>
<a href="#cl-350">350</a>
<a href="#cl-351">351</a>
<a href="#cl-352">352</a>
<a href="#cl-353">353</a>
<a href="#cl-354">354</a>
<a href="#cl-355">355</a>
<a href="#cl-356">356</a>
<a href="#cl-357">357</a>
<a href="#cl-358">358</a>
<a href="#cl-359">359</a>
<a href="#cl-360">360</a>
<a href="#cl-361">361</a>
<a href="#cl-362">362</a>
<a href="#cl-363">363</a>
<a href="#cl-364">364</a>
<a href="#cl-365">365</a>
<a href="#cl-366">366</a>
<a href="#cl-367">367</a>
<a href="#cl-368">368</a>
<a href="#cl-369">369</a>
<a href="#cl-370">370</a>
<a href="#cl-371">371</a>
<a href="#cl-372">372</a>
<a href="#cl-373">373</a>
<a href="#cl-374">374</a>
<a href="#cl-375">375</a>
<a href="#cl-376">376</a>
<a href="#cl-377">377</a>
<a href="#cl-378">378</a>
<a href="#cl-379">379</a>
<a href="#cl-380">380</a>
<a href="#cl-381">381</a>
<a href="#cl-382">382</a>
<a href="#cl-383">383</a>
<a href="#cl-384">384</a>
<a href="#cl-385">385</a>
<a href="#cl-386">386</a>
<a href="#cl-387">387</a>
<a href="#cl-388">388</a>
<a href="#cl-389">389</a>
<a href="#cl-390">390</a>
<a href="#cl-391">391</a>
<a href="#cl-392">392</a>
<a href="#cl-393">393</a>
<a href="#cl-394">394</a>
<a href="#cl-395">395</a>
<a href="#cl-396">396</a>
<a href="#cl-397">397</a>
<a href="#cl-398">398</a>
<a href="#cl-399">399</a>
<a href="#cl-400">400</a>
<a href="#cl-401">401</a>
<a href="#cl-402">402</a>
<a href="#cl-403">403</a>
<a href="#cl-404">404</a>
<a href="#cl-405">405</a>
<a href="#cl-406">406</a>
<a href="#cl-407">407</a>
<a href="#cl-408">408</a>
<a href="#cl-409">409</a>
<a href="#cl-410">410</a>
<a href="#cl-411">411</a>
<a href="#cl-412">412</a>
<a href="#cl-413">413</a>
<a href="#cl-414">414</a>
<a href="#cl-415">415</a>
<a href="#cl-416">416</a>
<a href="#cl-417">417</a>
<a href="#cl-418">418</a>
<a href="#cl-419">419</a>
<a href="#cl-420">420</a>
<a href="#cl-421">421</a>
<a href="#cl-422">422</a>
<a href="#cl-423">423</a>
<a href="#cl-424">424</a>
<a href="#cl-425">425</a>
<a href="#cl-426">426</a>
<a href="#cl-427">427</a>
<a href="#cl-428">428</a>
<a href="#cl-429">429</a>
<a href="#cl-430">430</a>
<a href="#cl-431">431</a>
<a href="#cl-432">432</a>
<a href="#cl-433">433</a>
<a href="#cl-434">434</a>
<a href="#cl-435">435</a>
<a href="#cl-436">436</a>
<a href="#cl-437">437</a>
<a href="#cl-438">438</a>
<a href="#cl-439">439</a>
<a href="#cl-440">440</a>
<a href="#cl-441">441</a>
<a href="#cl-442">442</a>
<a href="#cl-443">443</a>
<a href="#cl-444">444</a>
<a href="#cl-445">445</a>
<a href="#cl-446">446</a>
<a href="#cl-447">447</a>
<a href="#cl-448">448</a>
<a href="#cl-449">449</a>
<a href="#cl-450">450</a>
<a href="#cl-451">451</a>
<a href="#cl-452">452</a>
<a href="#cl-453">453</a>
<a href="#cl-454">454</a>
<a href="#cl-455">455</a>
<a href="#cl-456">456</a>
<a href="#cl-457">457</a>
<a href="#cl-458">458</a>
<a href="#cl-459">459</a>
<a href="#cl-460">460</a>
<a href="#cl-461">461</a>
<a href="#cl-462">462</a>
<a href="#cl-463">463</a>
<a href="#cl-464">464</a>
<a href="#cl-465">465</a>
<a href="#cl-466">466</a>
<a href="#cl-467">467</a>
<a href="#cl-468">468</a>
<a href="#cl-469">469</a>
<a href="#cl-470">470</a>
<a href="#cl-471">471</a>
<a href="#cl-472">472</a>
<a href="#cl-473">473</a>
<a href="#cl-474">474</a>
<a href="#cl-475">475</a>
<a href="#cl-476">476</a>
<a href="#cl-477">477</a>
<a href="#cl-478">478</a>
<a href="#cl-479">479</a>
<a href="#cl-480">480</a>
<a href="#cl-481">481</a>
<a href="#cl-482">482</a>
<a href="#cl-483">483</a>
<a href="#cl-484">484</a>
<a href="#cl-485">485</a>
<a href="#cl-486">486</a>
<a href="#cl-487">487</a>
<a href="#cl-488">488</a>
<a href="#cl-489">489</a>
<a href="#cl-490">490</a>
<a href="#cl-491">491</a>
<a href="#cl-492">492</a>
<a href="#cl-493">493</a>
<a href="#cl-494">494</a>
<a href="#cl-495">495</a>
<a href="#cl-496">496</a>
<a href="#cl-497">497</a>
<a href="#cl-498">498</a>
<a href="#cl-499">499</a>
<a href="#cl-500">500</a>
<a href="#cl-501">501</a>
<a href="#cl-502">502</a>
<a href="#cl-503">503</a>
<a href="#cl-504">504</a>
<a href="#cl-505">505</a>
<a href="#cl-506">506</a>
<a href="#cl-507">507</a>
<a href="#cl-508">508</a>
<a href="#cl-509">509</a>
<a href="#cl-510">510</a>
<a href="#cl-511">511</a>
<a href="#cl-512">512</a>
<a href="#cl-513">513</a>
<a href="#cl-514">514</a>
<a href="#cl-515">515</a>
<a href="#cl-516">516</a>
<a href="#cl-517">517</a>
<a href="#cl-518">518</a>
<a href="#cl-519">519</a>
<a href="#cl-520">520</a>
<a href="#cl-521">521</a>
<a href="#cl-522">522</a>
<a href="#cl-523">523</a>
<a href="#cl-524">524</a>
<a href="#cl-525">525</a>
<a href="#cl-526">526</a>
<a href="#cl-527">527</a>
<a href="#cl-528">528</a>
<a href="#cl-529">529</a>
<a href="#cl-530">530</a>
<a href="#cl-531">531</a>
<a href="#cl-532">532</a>
<a href="#cl-533">533</a>
<a href="#cl-534">534</a>
<a href="#cl-535">535</a>
<a href="#cl-536">536</a>
<a href="#cl-537">537</a>
<a href="#cl-538">538</a>
<a href="#cl-539">539</a>
<a href="#cl-540">540</a>
<a href="#cl-541">541</a>
<a href="#cl-542">542</a>
<a href="#cl-543">543</a>
<a href="#cl-544">544</a>
<a href="#cl-545">545</a>
<a href="#cl-546">546</a>
<a href="#cl-547">547</a>
<a href="#cl-548">548</a>
<a href="#cl-549">549</a>
<a href="#cl-550">550</a>
<a href="#cl-551">551</a>
<a href="#cl-552">552</a>
<a href="#cl-553">553</a>
<a href="#cl-554">554</a>
<a href="#cl-555">555</a>
<a href="#cl-556">556</a>
<a href="#cl-557">557</a>
<a href="#cl-558">558</a>
<a href="#cl-559">559</a>
<a href="#cl-560">560</a>
<a href="#cl-561">561</a>
<a href="#cl-562">562</a>
<a href="#cl-563">563</a>
<a href="#cl-564">564</a>
<a href="#cl-565">565</a>
<a href="#cl-566">566</a>
<a href="#cl-567">567</a>
<a href="#cl-568">568</a>
<a href="#cl-569">569</a>
<a href="#cl-570">570</a>
<a href="#cl-571">571</a>
<a href="#cl-572">572</a>
<a href="#cl-573">573</a>
<a href="#cl-574">574</a>
<a href="#cl-575">575</a>
<a href="#cl-576">576</a>
<a href="#cl-577">577</a>
<a href="#cl-578">578</a>
<a href="#cl-579">579</a>
<a href="#cl-580">580</a>
<a href="#cl-581">581</a>
<a href="#cl-582">582</a>
<a href="#cl-583">583</a>
<a href="#cl-584">584</a>
<a href="#cl-585">585</a>
<a href="#cl-586">586</a>
<a href="#cl-587">587</a>
<a href="#cl-588">588</a>
<a href="#cl-589">589</a>
<a href="#cl-590">590</a>
<a href="#cl-591">591</a>
<a href="#cl-592">592</a>
<a href="#cl-593">593</a>
<a href="#cl-594">594</a>
<a href="#cl-595">595</a>
<a href="#cl-596">596</a>
<a href="#cl-597">597</a>
<a href="#cl-598">598</a>
<a href="#cl-599">599</a>
<a href="#cl-600">600</a>
<a href="#cl-601">601</a>
<a href="#cl-602">602</a>
<a href="#cl-603">603</a>
<a href="#cl-604">604</a>
<a href="#cl-605">605</a>
<a href="#cl-606">606</a>
<a href="#cl-607">607</a>
<a href="#cl-608">608</a>
<a href="#cl-609">609</a>
<a href="#cl-610">610</a>
<a href="#cl-611">611</a>
<a href="#cl-612">612</a>
<a href="#cl-613">613</a>
<a href="#cl-614">614</a>
<a href="#cl-615">615</a>
<a href="#cl-616">616</a>
<a href="#cl-617">617</a>
<a href="#cl-618">618</a>
<a href="#cl-619">619</a>
<a href="#cl-620">620</a>
<a href="#cl-621">621</a>
<a href="#cl-622">622</a>
<a href="#cl-623">623</a>
<a href="#cl-624">624</a>
<a href="#cl-625">625</a>
<a href="#cl-626">626</a>
<a href="#cl-627">627</a>
<a href="#cl-628">628</a>
<a href="#cl-629">629</a>
<a href="#cl-630">630</a>
<a href="#cl-631">631</a>
<a href="#cl-632">632</a>
<a href="#cl-633">633</a>
<a href="#cl-634">634</a>
<a href="#cl-635">635</a>
<a href="#cl-636">636</a>
<a href="#cl-637">637</a>
<a href="#cl-638">638</a>
<a href="#cl-639">639</a>
<a href="#cl-640">640</a>
<a href="#cl-641">641</a>
<a href="#cl-642">642</a>
<a href="#cl-643">643</a>
<a href="#cl-644">644</a>
<a href="#cl-645">645</a>
<a href="#cl-646">646</a>
<a href="#cl-647">647</a>
<a href="#cl-648">648</a>
<a href="#cl-649">649</a>
<a href="#cl-650">650</a>
<a href="#cl-651">651</a>
<a href="#cl-652">652</a>
<a href="#cl-653">653</a>
<a href="#cl-654">654</a>
<a href="#cl-655">655</a>
<a href="#cl-656">656</a>
<a href="#cl-657">657</a>
<a href="#cl-658">658</a>
<a href="#cl-659">659</a>
<a href="#cl-660">660</a>
<a href="#cl-661">661</a>
<a href="#cl-662">662</a>
<a href="#cl-663">663</a>
<a href="#cl-664">664</a>
<a href="#cl-665">665</a>
<a href="#cl-666">666</a>
<a href="#cl-667">667</a>
<a href="#cl-668">668</a>
<a href="#cl-669">669</a>
<a href="#cl-670">670</a>
<a href="#cl-671">671</a>
<a href="#cl-672">672</a>
<a href="#cl-673">673</a>
<a href="#cl-674">674</a>
<a href="#cl-675">675</a>
<a href="#cl-676">676</a>
<a href="#cl-677">677</a>
<a href="#cl-678">678</a>
<a href="#cl-679">679</a>
<a href="#cl-680">680</a>
<a href="#cl-681">681</a>
<a href="#cl-682">682</a>
<a href="#cl-683">683</a>
<a href="#cl-684">684</a>
<a href="#cl-685">685</a>
<a href="#cl-686">686</a>
<a href="#cl-687">687</a>
<a href="#cl-688">688</a>
<a href="#cl-689">689</a>
<a href="#cl-690">690</a>
<a href="#cl-691">691</a>
<a href="#cl-692">692</a>
<a href="#cl-693">693</a>
<a href="#cl-694">694</a>
<a href="#cl-695">695</a>
<a href="#cl-696">696</a>
<a href="#cl-697">697</a>
<a href="#cl-698">698</a>
<a href="#cl-699">699</a>
<a href="#cl-700">700</a>
<a href="#cl-701">701</a>
<a href="#cl-702">702</a>
<a href="#cl-703">703</a>
<a href="#cl-704">704</a>
<a href="#cl-705">705</a>
<a href="#cl-706">706</a>
<a href="#cl-707">707</a>
<a href="#cl-708">708</a>
<a href="#cl-709">709</a>
<a href="#cl-710">710</a>
<a href="#cl-711">711</a>
<a href="#cl-712">712</a>
<a href="#cl-713">713</a>
<a href="#cl-714">714</a>
<a href="#cl-715">715</a>
<a href="#cl-716">716</a>
<a href="#cl-717">717</a>
<a href="#cl-718">718</a>
<a href="#cl-719">719</a>
<a href="#cl-720">720</a>
<a href="#cl-721">721</a>
<a href="#cl-722">722</a>
<a href="#cl-723">723</a>
<a href="#cl-724">724</a>
<a href="#cl-725">725</a>
<a href="#cl-726">726</a>
<a href="#cl-727">727</a>
<a href="#cl-728">728</a>
<a href="#cl-729">729</a>
<a href="#cl-730">730</a>
<a href="#cl-731">731</a>
<a href="#cl-732">732</a>
<a href="#cl-733">733</a>
<a href="#cl-734">734</a>
<a href="#cl-735">735</a>
<a href="#cl-736">736</a>
<a href="#cl-737">737</a>
<a href="#cl-738">738</a>
<a href="#cl-739">739</a>
<a href="#cl-740">740</a>
<a href="#cl-741">741</a>
<a href="#cl-742">742</a>
<a href="#cl-743">743</a>
<a href="#cl-744">744</a>
<a href="#cl-745">745</a>
<a href="#cl-746">746</a>
<a href="#cl-747">747</a>
<a href="#cl-748">748</a>
<a href="#cl-749">749</a>
<a href="#cl-750">750</a>
<a href="#cl-751">751</a>
<a href="#cl-752">752</a>
<a href="#cl-753">753</a>
<a href="#cl-754">754</a>
<a href="#cl-755">755</a>
<a href="#cl-756">756</a>
<a href="#cl-757">757</a>
<a href="#cl-758">758</a>
<a href="#cl-759">759</a>
<a href="#cl-760">760</a>
<a href="#cl-761">761</a>
<a href="#cl-762">762</a>
<a href="#cl-763">763</a>
<a href="#cl-764">764</a>
<a href="#cl-765">765</a>
<a href="#cl-766">766</a>
<a href="#cl-767">767</a>
<a href="#cl-768">768</a>
<a href="#cl-769">769</a>
<a href="#cl-770">770</a>
<a href="#cl-771">771</a>
<a href="#cl-772">772</a>
<a href="#cl-773">773</a>
<a href="#cl-774">774</a>
<a href="#cl-775">775</a>
<a href="#cl-776">776</a>
<a href="#cl-777">777</a>
<a href="#cl-778">778</a>
<a href="#cl-779">779</a>
<a href="#cl-780">780</a>
<a href="#cl-781">781</a>
<a href="#cl-782">782</a>
<a href="#cl-783">783</a>
<a href="#cl-784">784</a>
<a href="#cl-785">785</a>
<a href="#cl-786">786</a>
<a href="#cl-787">787</a>
<a href="#cl-788">788</a>
<a href="#cl-789">789</a>
<a href="#cl-790">790</a>
<a href="#cl-791">791</a>
<a href="#cl-792">792</a>
<a href="#cl-793">793</a>
<a href="#cl-794">794</a>
<a href="#cl-795">795</a>
<a href="#cl-796">796</a>
<a href="#cl-797">797</a>
<a href="#cl-798">798</a>
<a href="#cl-799">799</a>
<a href="#cl-800">800</a>
<a href="#cl-801">801</a>
<a href="#cl-802">802</a>
<a href="#cl-803">803</a>
<a href="#cl-804">804</a>
<a href="#cl-805">805</a>
<a href="#cl-806">806</a>
<a href="#cl-807">807</a>
<a href="#cl-808">808</a>
<a href="#cl-809">809</a>
<a href="#cl-810">810</a>
<a href="#cl-811">811</a>
<a href="#cl-812">812</a>
<a href="#cl-813">813</a>
<a href="#cl-814">814</a>
<a href="#cl-815">815</a>
<a href="#cl-816">816</a>
<a href="#cl-817">817</a>
<a href="#cl-818">818</a>
<a href="#cl-819">819</a>
<a href="#cl-820">820</a>
<a href="#cl-821">821</a>
<a href="#cl-822">822</a>
<a href="#cl-823">823</a>
<a href="#cl-824">824</a>
<a href="#cl-825">825</a>
<a href="#cl-826">826</a>
<a href="#cl-827">827</a>
<a href="#cl-828">828</a>
<a href="#cl-829">829</a>
<a href="#cl-830">830</a>
<a href="#cl-831">831</a>
<a href="#cl-832">832</a>
<a href="#cl-833">833</a>
<a href="#cl-834">834</a>
<a href="#cl-835">835</a>
<a href="#cl-836">836</a>
<a href="#cl-837">837</a>
<a href="#cl-838">838</a>
<a href="#cl-839">839</a>
<a href="#cl-840">840</a>
<a href="#cl-841">841</a>
<a href="#cl-842">842</a>
<a href="#cl-843">843</a>
<a href="#cl-844">844</a>
<a href="#cl-845">845</a>
<a href="#cl-846">846</a>
<a href="#cl-847">847</a>
<a href="#cl-848">848</a>
<a href="#cl-849">849</a>
<a href="#cl-850">850</a>
<a href="#cl-851">851</a>
<a href="#cl-852">852</a>
<a href="#cl-853">853</a>
<a href="#cl-854">854</a>
<a href="#cl-855">855</a>
<a href="#cl-856">856</a>
<a href="#cl-857">857</a>
<a href="#cl-858">858</a>
<a href="#cl-859">859</a>
<a href="#cl-860">860</a>
<a href="#cl-861">861</a>
<a href="#cl-862">862</a>
<a href="#cl-863">863</a>
<a href="#cl-864">864</a>
<a href="#cl-865">865</a>
<a href="#cl-866">866</a>
<a href="#cl-867">867</a>
<a href="#cl-868">868</a>
<a href="#cl-869">869</a>
<a href="#cl-870">870</a>
<a href="#cl-871">871</a>
<a href="#cl-872">872</a>
<a href="#cl-873">873</a>
<a href="#cl-874">874</a>
<a href="#cl-875">875</a>
<a href="#cl-876">876</a>
<a href="#cl-877">877</a>
<a href="#cl-878">878</a>
<a href="#cl-879">879</a>
<a href="#cl-880">880</a>
<a href="#cl-881">881</a>
<a href="#cl-882">882</a>
<a href="#cl-883">883</a>
<a href="#cl-884">884</a>
<a href="#cl-885">885</a>
<a href="#cl-886">886</a>
<a href="#cl-887">887</a>
<a href="#cl-888">888</a>
<a href="#cl-889">889</a>
<a href="#cl-890">890</a>
<a href="#cl-891">891</a>
<a href="#cl-892">892</a>
<a href="#cl-893">893</a>
<a href="#cl-894">894</a>
<a href="#cl-895">895</a>
<a href="#cl-896">896</a>
<a href="#cl-897">897</a>
<a href="#cl-898">898</a>
<a href="#cl-899">899</a>
<a href="#cl-900">900</a>
<a href="#cl-901">901</a>
<a href="#cl-902">902</a>
<a href="#cl-903">903</a>
<a href="#cl-904">904</a>
<a href="#cl-905">905</a>
<a href="#cl-906">906</a>
<a href="#cl-907">907</a>
<a href="#cl-908">908</a>
<a href="#cl-909">909</a>
<a href="#cl-910">910</a>
<a href="#cl-911">911</a>
<a href="#cl-912">912</a>
<a href="#cl-913">913</a>
<a href="#cl-914">914</a>
<a href="#cl-915">915</a>
<a href="#cl-916">916</a>
<a href="#cl-917">917</a>
<a href="#cl-918">918</a>
<a href="#cl-919">919</a>
<a href="#cl-920">920</a>
<a href="#cl-921">921</a>
<a href="#cl-922">922</a>
<a href="#cl-923">923</a>
<a href="#cl-924">924</a>
<a href="#cl-925">925</a>
<a href="#cl-926">926</a>
<a href="#cl-927">927</a>
<a href="#cl-928">928</a>
<a href="#cl-929">929</a>
<a href="#cl-930">930</a>
<a href="#cl-931">931</a></pre></div></td><td class="code"><div class="highlight"><pre><a name="cl-1"></a><span class="p">(</span><span class="kd">function</span><span class="p">(){</span><span class="nx">d3</span><span class="p">.</span><span class="nx">geo</span> <span class="o">=</span> <span class="p">{};</span>
<a name="cl-2"></a>
<a name="cl-3"></a><span class="kd">var</span> <span class="nx">d3_geo_radians</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">PI</span> <span class="o">/</span> <span class="mi">180</span><span class="p">;</span>
<a name="cl-4"></a><span class="c1">// TODO clip input coordinates on opposite hemisphere</span>
<a name="cl-5"></a><span class="nx">d3</span><span class="p">.</span><span class="nx">geo</span><span class="p">.</span><span class="nx">azimuthal</span> <span class="o">=</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
<a name="cl-6"></a>  <span class="kd">var</span> <span class="nx">mode</span> <span class="o">=</span> <span class="s2">&quot;orthographic&quot;</span><span class="p">,</span> <span class="c1">// or stereographic, gnomonic, equidistant or equalarea</span>
<a name="cl-7"></a>      <span class="nx">origin</span><span class="p">,</span>
<a name="cl-8"></a>      <span class="nx">scale</span> <span class="o">=</span> <span class="mi">200</span><span class="p">,</span>
<a name="cl-9"></a>      <span class="nx">translate</span> <span class="o">=</span> <span class="cp">[</span><span class="mi">480</span><span class="p">,</span> <span class="mi">250</span><span class="cp">]</span><span class="p">,</span>
<a name="cl-10"></a>      <span class="nx">x0</span><span class="p">,</span>
<a name="cl-11"></a>      <span class="nx">y0</span><span class="p">,</span>
<a name="cl-12"></a>      <span class="nx">cy0</span><span class="p">,</span>
<a name="cl-13"></a>      <span class="nx">sy0</span><span class="p">;</span>
<a name="cl-14"></a>
<a name="cl-15"></a>  <span class="kd">function</span> <span class="nx">azimuthal</span><span class="p">(</span><span class="nx">coordinates</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-16"></a>    <span class="kd">var</span> <span class="nx">x1</span> <span class="o">=</span> <span class="nx">coordinates</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span> <span class="o">*</span> <span class="nx">d3_geo_radians</span> <span class="o">-</span> <span class="nx">x0</span><span class="p">,</span>
<a name="cl-17"></a>        <span class="nx">y1</span> <span class="o">=</span> <span class="nx">coordinates</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span> <span class="o">*</span> <span class="nx">d3_geo_radians</span><span class="p">,</span>
<a name="cl-18"></a>        <span class="nx">cx1</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">cos</span><span class="p">(</span><span class="nx">x1</span><span class="p">),</span>
<a name="cl-19"></a>        <span class="nx">sx1</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">sin</span><span class="p">(</span><span class="nx">x1</span><span class="p">),</span>
<a name="cl-20"></a>        <span class="nx">cy1</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">cos</span><span class="p">(</span><span class="nx">y1</span><span class="p">),</span>
<a name="cl-21"></a>        <span class="nx">sy1</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">sin</span><span class="p">(</span><span class="nx">y1</span><span class="p">),</span>
<a name="cl-22"></a>        <span class="nx">cc</span> <span class="o">=</span> <span class="nx">mode</span> <span class="o">!==</span> <span class="s2">&quot;orthographic&quot;</span> <span class="o">?</span> <span class="nx">sy0</span> <span class="o">*</span> <span class="nx">sy1</span> <span class="o">+</span> <span class="nx">cy0</span> <span class="o">*</span> <span class="nx">cy1</span> <span class="o">*</span> <span class="nx">cx1</span> <span class="o">:</span> <span class="kc">null</span><span class="p">,</span>
<a name="cl-23"></a>        <span class="nx">c</span><span class="p">,</span>
<a name="cl-24"></a>        <span class="nx">k</span> <span class="o">=</span> <span class="nx">mode</span> <span class="o">===</span> <span class="s2">&quot;stereographic&quot;</span> <span class="o">?</span> <span class="mi">1</span> <span class="o">/</span> <span class="p">(</span><span class="mi">1</span> <span class="o">+</span> <span class="nx">cc</span><span class="p">)</span>
<a name="cl-25"></a>          <span class="o">:</span> <span class="nx">mode</span> <span class="o">===</span> <span class="s2">&quot;gnomonic&quot;</span> <span class="o">?</span> <span class="mi">1</span> <span class="o">/</span> <span class="nx">cc</span>
<a name="cl-26"></a>          <span class="o">:</span> <span class="nx">mode</span> <span class="o">===</span> <span class="s2">&quot;equidistant&quot;</span> <span class="o">?</span> <span class="p">(</span><span class="nx">c</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">acos</span><span class="p">(</span><span class="nx">cc</span><span class="p">),</span> <span class="nx">c</span> <span class="o">?</span> <span class="nx">c</span> <span class="o">/</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">sin</span><span class="p">(</span><span class="nx">c</span><span class="p">)</span> <span class="o">:</span> <span class="mi">0</span><span class="p">)</span>
<a name="cl-27"></a>          <span class="o">:</span> <span class="nx">mode</span> <span class="o">===</span> <span class="s2">&quot;equalarea&quot;</span> <span class="o">?</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">sqrt</span><span class="p">(</span><span class="mi">2</span> <span class="o">/</span> <span class="p">(</span><span class="mi">1</span> <span class="o">+</span> <span class="nx">cc</span><span class="p">))</span>
<a name="cl-28"></a>          <span class="o">:</span> <span class="mi">1</span><span class="p">,</span>
<a name="cl-29"></a>        <span class="nx">x</span> <span class="o">=</span> <span class="nx">k</span> <span class="o">*</span> <span class="nx">cy1</span> <span class="o">*</span> <span class="nx">sx1</span><span class="p">,</span>
<a name="cl-30"></a>        <span class="nx">y</span> <span class="o">=</span> <span class="nx">k</span> <span class="o">*</span> <span class="p">(</span><span class="nx">sy0</span> <span class="o">*</span> <span class="nx">cy1</span> <span class="o">*</span> <span class="nx">cx1</span> <span class="o">-</span> <span class="nx">cy0</span> <span class="o">*</span> <span class="nx">sy1</span><span class="p">);</span>
<a name="cl-31"></a>    <span class="k">return</span> <span class="cp">[</span>
<a name="cl-32"></a>      <span class="nx">scale</span> <span class="o">*</span> <span class="nx">x</span> <span class="o">+</span> <span class="nx">translate</span><span class="err">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">,</span>
<a name="cl-33"></a>      <span class="nx">scale</span> <span class="o">*</span> <span class="nx">y</span> <span class="o">+</span> <span class="nx">translate</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span>
<a name="cl-34"></a>    <span class="p">];</span>
<a name="cl-35"></a>  <span class="p">}</span>
<a name="cl-36"></a>
<a name="cl-37"></a>  <span class="nx">azimuthal</span><span class="p">.</span><span class="nx">invert</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">coordinates</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-38"></a>    <span class="kd">var</span> <span class="nx">x</span> <span class="o">=</span> <span class="p">(</span><span class="nx">coordinates</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span> <span class="o">-</span> <span class="nx">translate</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">)</span> <span class="o">/</span> <span class="nx">scale</span><span class="p">,</span>
<a name="cl-39"></a>        <span class="nx">y</span> <span class="o">=</span> <span class="p">(</span><span class="nx">coordinates</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span> <span class="o">-</span> <span class="nx">translate</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span><span class="p">)</span> <span class="o">/</span> <span class="nx">scale</span><span class="p">,</span>
<a name="cl-40"></a>        <span class="nx">p</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">sqrt</span><span class="p">(</span><span class="nx">x</span> <span class="o">*</span> <span class="nx">x</span> <span class="o">+</span> <span class="nx">y</span> <span class="o">*</span> <span class="nx">y</span><span class="p">),</span>
<a name="cl-41"></a>        <span class="nx">c</span> <span class="o">=</span> <span class="nx">mode</span> <span class="o">===</span> <span class="s2">&quot;stereographic&quot;</span> <span class="o">?</span> <span class="mi">2</span> <span class="o">*</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">atan</span><span class="p">(</span><span class="nx">p</span><span class="p">)</span>
<a name="cl-42"></a>          <span class="o">:</span> <span class="nx">mode</span> <span class="o">===</span> <span class="s2">&quot;gnomonic&quot;</span> <span class="o">?</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">atan</span><span class="p">(</span><span class="nx">p</span><span class="p">)</span>
<a name="cl-43"></a>          <span class="o">:</span> <span class="nx">mode</span> <span class="o">===</span> <span class="s2">&quot;equidistant&quot;</span> <span class="o">?</span> <span class="nx">p</span>
<a name="cl-44"></a>          <span class="o">:</span> <span class="nx">mode</span> <span class="o">===</span> <span class="s2">&quot;equalarea&quot;</span> <span class="o">?</span> <span class="mi">2</span> <span class="o">*</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">asin</span><span class="p">(.</span><span class="mi">5</span> <span class="o">*</span> <span class="nx">p</span><span class="p">)</span>
<a name="cl-45"></a>          <span class="o">:</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">asin</span><span class="p">(</span><span class="nx">p</span><span class="p">),</span>
<a name="cl-46"></a>        <span class="nx">sc</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">sin</span><span class="p">(</span><span class="nx">c</span><span class="p">),</span>
<a name="cl-47"></a>        <span class="nx">cc</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">cos</span><span class="p">(</span><span class="nx">c</span><span class="p">);</span>
<a name="cl-48"></a>    <span class="k">return</span> <span class="cp">[</span>
<a name="cl-49"></a>      <span class="p">(</span><span class="nx">x0</span> <span class="o">+</span> <span class="nx">Math.atan2</span><span class="p">(</span><span class="nx">x</span> <span class="o">*</span> <span class="nx">sc</span><span class="p">,</span> <span class="nx">p</span> <span class="o">*</span> <span class="nx">cy0</span> <span class="o">*</span> <span class="nx">cc</span> <span class="o">+</span> <span class="nx">y</span> <span class="o">*</span> <span class="nx">sy0</span> <span class="o">*</span> <span class="nx">sc</span><span class="p">))</span> <span class="o">/</span> <span class="nx">d3_geo_radians</span><span class="p">,</span>
<a name="cl-50"></a>      <span class="nx">Math.asin</span><span class="p">(</span><span class="nx">cc</span> <span class="o">*</span> <span class="nx">sy0</span> <span class="o">-</span> <span class="p">(</span><span class="nx">p</span> <span class="o">?</span> <span class="p">(</span><span class="nx">y</span> <span class="o">*</span> <span class="nx">sc</span> <span class="o">*</span> <span class="nx">cy0</span><span class="p">)</span> <span class="o">/</span> <span class="nx">p</span> <span class="p">:</span> <span class="mi">0</span><span class="p">))</span> <span class="o">/</span> <span class="nx">d3_geo_radians</span>
<a name="cl-51"></a>    <span class="cp">]</span><span class="p">;</span>
<a name="cl-52"></a>  <span class="p">};</span>
<a name="cl-53"></a>
<a name="cl-54"></a>  <span class="nx">azimuthal</span><span class="p">.</span><span class="nx">mode</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-55"></a>    <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="k">return</span> <span class="nx">mode</span><span class="p">;</span>
<a name="cl-56"></a>    <span class="nx">mode</span> <span class="o">=</span> <span class="nx">x</span> <span class="o">+</span> <span class="s2">&quot;&quot;</span><span class="p">;</span>
<a name="cl-57"></a>    <span class="k">return</span> <span class="nx">azimuthal</span><span class="p">;</span>
<a name="cl-58"></a>  <span class="p">};</span>
<a name="cl-59"></a>
<a name="cl-60"></a>  <span class="nx">azimuthal</span><span class="p">.</span><span class="nx">origin</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-61"></a>    <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="k">return</span> <span class="nx">origin</span><span class="p">;</span>
<a name="cl-62"></a>    <span class="nx">origin</span> <span class="o">=</span> <span class="nx">x</span><span class="p">;</span>
<a name="cl-63"></a>    <span class="nx">x0</span> <span class="o">=</span> <span class="nx">origin</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span> <span class="o">*</span> <span class="nx">d3_geo_radians</span><span class="p">;</span>
<a name="cl-64"></a>    <span class="nx">y0</span> <span class="o">=</span> <span class="nx">origin</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span> <span class="o">*</span> <span class="nx">d3_geo_radians</span><span class="p">;</span>
<a name="cl-65"></a>    <span class="nx">cy0</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">cos</span><span class="p">(</span><span class="nx">y0</span><span class="p">);</span>
<a name="cl-66"></a>    <span class="nx">sy0</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">sin</span><span class="p">(</span><span class="nx">y0</span><span class="p">);</span>
<a name="cl-67"></a>    <span class="k">return</span> <span class="nx">azimuthal</span><span class="p">;</span>
<a name="cl-68"></a>  <span class="p">};</span>
<a name="cl-69"></a>
<a name="cl-70"></a>  <span class="nx">azimuthal</span><span class="p">.</span><span class="nx">scale</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-71"></a>    <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="k">return</span> <span class="nx">scale</span><span class="p">;</span>
<a name="cl-72"></a>    <span class="nx">scale</span> <span class="o">=</span> <span class="o">+</span><span class="nx">x</span><span class="p">;</span>
<a name="cl-73"></a>    <span class="k">return</span> <span class="nx">azimuthal</span><span class="p">;</span>
<a name="cl-74"></a>  <span class="p">};</span>
<a name="cl-75"></a>
<a name="cl-76"></a>  <span class="nx">azimuthal</span><span class="p">.</span><span class="nx">translate</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-77"></a>    <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="k">return</span> <span class="nx">translate</span><span class="p">;</span>
<a name="cl-78"></a>    <span class="nx">translate</span> <span class="o">=</span> <span class="cp">[</span><span class="o">+</span><span class="nx">x</span><span class="err">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">,</span> <span class="o">+</span><span class="nx">x</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span><span class="p">];</span>
<a name="cl-79"></a>    <span class="k">return</span> <span class="nx">azimuthal</span><span class="p">;</span>
<a name="cl-80"></a>  <span class="p">};</span>
<a name="cl-81"></a>
<a name="cl-82"></a>  <span class="k">return</span> <span class="nx">azimuthal</span><span class="p">.</span><span class="nx">origin</span><span class="p">(</span><span class="cp">[</span><span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="cp">]</span><span class="p">);</span>
<a name="cl-83"></a><span class="p">};</span>
<a name="cl-84"></a><span class="c1">// Derived from Tom Carden&#39;s Albers implementation for Protovis.</span>
<a name="cl-85"></a><span class="c1">// http://gist.github.com/476238</span>
<a name="cl-86"></a><span class="c1">// http://mathworld.wolfram.com/AlbersEqual-AreaConicProjection.html</span>
<a name="cl-87"></a>
<a name="cl-88"></a><span class="nx">d3</span><span class="p">.</span><span class="nx">geo</span><span class="p">.</span><span class="nx">albers</span> <span class="o">=</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
<a name="cl-89"></a>  <span class="kd">var</span> <span class="nx">origin</span> <span class="o">=</span> <span class="cp">[</span><span class="o">-</span><span class="mi">98</span><span class="p">,</span> <span class="mi">38</span><span class="cp">]</span><span class="p">,</span>
<a name="cl-90"></a>      <span class="nx">parallels</span> <span class="o">=</span> <span class="cp">[</span><span class="mf">29.5</span><span class="p">,</span> <span class="mf">45.5</span><span class="cp">]</span><span class="p">,</span>
<a name="cl-91"></a>      <span class="nx">scale</span> <span class="o">=</span> <span class="mi">1000</span><span class="p">,</span>
<a name="cl-92"></a>      <span class="nx">translate</span> <span class="o">=</span> <span class="cp">[</span><span class="mi">480</span><span class="p">,</span> <span class="mi">250</span><span class="cp">]</span><span class="p">,</span>
<a name="cl-93"></a>      <span class="nx">lng0</span><span class="p">,</span> <span class="c1">// d3_geo_radians * origin</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span><span class="c1"></span>
<a name="cl-94"></a>      <span class="nx">n</span><span class="p">,</span>
<a name="cl-95"></a>      <span class="nx">C</span><span class="p">,</span>
<a name="cl-96"></a>      <span class="nx">p0</span><span class="p">;</span>
<a name="cl-97"></a>
<a name="cl-98"></a>  <span class="kd">function</span> <span class="nx">albers</span><span class="p">(</span><span class="nx">coordinates</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-99"></a>    <span class="kd">var</span> <span class="nx">t</span> <span class="o">=</span> <span class="nx">n</span> <span class="o">*</span> <span class="p">(</span><span class="nx">d3_geo_radians</span> <span class="o">*</span> <span class="nx">coordinates</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span> <span class="o">-</span> <span class="nx">lng0</span><span class="p">),</span>
<a name="cl-100"></a>        <span class="nx">p</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">sqrt</span><span class="p">(</span><span class="nx">C</span> <span class="o">-</span> <span class="mi">2</span> <span class="o">*</span> <span class="nx">n</span> <span class="o">*</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">sin</span><span class="p">(</span><span class="nx">d3_geo_radians</span> <span class="o">*</span> <span class="nx">coordinates</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span><span class="p">))</span> <span class="o">/</span> <span class="nx">n</span><span class="p">;</span>
<a name="cl-101"></a>    <span class="k">return</span> <span class="cp">[</span>
<a name="cl-102"></a>      <span class="nx">scale</span> <span class="o">*</span> <span class="nx">p</span> <span class="o">*</span> <span class="nx">Math.sin</span><span class="p">(</span><span class="nx">t</span><span class="p">)</span> <span class="o">+</span> <span class="nx">translate</span><span class="err">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">,</span>
<a name="cl-103"></a>      <span class="nx">scale</span> <span class="o">*</span> <span class="p">(</span><span class="nx">p</span> <span class="o">*</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">cos</span><span class="p">(</span><span class="nx">t</span><span class="p">)</span> <span class="o">-</span> <span class="nx">p0</span><span class="p">)</span> <span class="o">+</span> <span class="nx">translate</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span>
<a name="cl-104"></a>    <span class="p">];</span>
<a name="cl-105"></a>  <span class="p">}</span>
<a name="cl-106"></a>
<a name="cl-107"></a>  <span class="nx">albers</span><span class="p">.</span><span class="nx">invert</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">coordinates</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-108"></a>    <span class="kd">var</span> <span class="nx">x</span> <span class="o">=</span> <span class="p">(</span><span class="nx">coordinates</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span> <span class="o">-</span> <span class="nx">translate</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">)</span> <span class="o">/</span> <span class="nx">scale</span><span class="p">,</span>
<a name="cl-109"></a>        <span class="nx">y</span> <span class="o">=</span> <span class="p">(</span><span class="nx">coordinates</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span> <span class="o">-</span> <span class="nx">translate</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span><span class="p">)</span> <span class="o">/</span> <span class="nx">scale</span><span class="p">,</span>
<a name="cl-110"></a>        <span class="nx">p0y</span> <span class="o">=</span> <span class="nx">p0</span> <span class="o">+</span> <span class="nx">y</span><span class="p">,</span>
<a name="cl-111"></a>        <span class="nx">t</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">atan2</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="nx">p0y</span><span class="p">),</span>
<a name="cl-112"></a>        <span class="nx">p</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">sqrt</span><span class="p">(</span><span class="nx">x</span> <span class="o">*</span> <span class="nx">x</span> <span class="o">+</span> <span class="nx">p0y</span> <span class="o">*</span> <span class="nx">p0y</span><span class="p">);</span>
<a name="cl-113"></a>    <span class="k">return</span> <span class="cp">[</span>
<a name="cl-114"></a>      <span class="p">(</span><span class="nx">lng0</span> <span class="o">+</span> <span class="nx">t</span> <span class="o">/</span> <span class="nx">n</span><span class="p">)</span> <span class="o">/</span> <span class="nx">d3_geo_radians</span><span class="p">,</span>
<a name="cl-115"></a>      <span class="nx">Math.asin</span><span class="p">((</span><span class="nx">C</span> <span class="o">-</span> <span class="nx">p</span> <span class="o">*</span> <span class="nx">p</span> <span class="o">*</span> <span class="nx">n</span> <span class="o">*</span> <span class="nx">n</span><span class="p">)</span> <span class="o">/</span> <span class="p">(</span><span class="mi">2</span> <span class="o">*</span> <span class="nx">n</span><span class="p">))</span> <span class="o">/</span> <span class="nx">d3_geo_radians</span>
<a name="cl-116"></a>    <span class="cp">]</span><span class="p">;</span>
<a name="cl-117"></a>  <span class="p">};</span>
<a name="cl-118"></a>
<a name="cl-119"></a>  <span class="kd">function</span> <span class="nx">reload</span><span class="p">()</span> <span class="p">{</span>
<a name="cl-120"></a>    <span class="kd">var</span> <span class="nx">phi1</span> <span class="o">=</span> <span class="nx">d3_geo_radians</span> <span class="o">*</span> <span class="nx">parallels</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">,</span>
<a name="cl-121"></a>        <span class="nx">phi2</span> <span class="o">=</span> <span class="nx">d3_geo_radians</span> <span class="o">*</span> <span class="nx">parallels</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span><span class="p">,</span>
<a name="cl-122"></a>        <span class="nx">lat0</span> <span class="o">=</span> <span class="nx">d3_geo_radians</span> <span class="o">*</span> <span class="nx">origin</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span><span class="p">,</span>
<a name="cl-123"></a>        <span class="nx">s</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">sin</span><span class="p">(</span><span class="nx">phi1</span><span class="p">),</span>
<a name="cl-124"></a>        <span class="nx">c</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">cos</span><span class="p">(</span><span class="nx">phi1</span><span class="p">);</span>
<a name="cl-125"></a>    <span class="nx">lng0</span> <span class="o">=</span> <span class="nx">d3_geo_radians</span> <span class="o">*</span> <span class="nx">origin</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">;</span>
<a name="cl-126"></a>    <span class="nx">n</span> <span class="o">=</span> <span class="p">.</span><span class="mi">5</span> <span class="o">*</span> <span class="p">(</span><span class="nx">s</span> <span class="o">+</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">sin</span><span class="p">(</span><span class="nx">phi2</span><span class="p">));</span>
<a name="cl-127"></a>    <span class="nx">C</span> <span class="o">=</span> <span class="nx">c</span> <span class="o">*</span> <span class="nx">c</span> <span class="o">+</span> <span class="mi">2</span> <span class="o">*</span> <span class="nx">n</span> <span class="o">*</span> <span class="nx">s</span><span class="p">;</span>
<a name="cl-128"></a>    <span class="nx">p0</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">sqrt</span><span class="p">(</span><span class="nx">C</span> <span class="o">-</span> <span class="mi">2</span> <span class="o">*</span> <span class="nx">n</span> <span class="o">*</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">sin</span><span class="p">(</span><span class="nx">lat0</span><span class="p">))</span> <span class="o">/</span> <span class="nx">n</span><span class="p">;</span>
<a name="cl-129"></a>    <span class="k">return</span> <span class="nx">albers</span><span class="p">;</span>
<a name="cl-130"></a>  <span class="p">}</span>
<a name="cl-131"></a>
<a name="cl-132"></a>  <span class="nx">albers</span><span class="p">.</span><span class="nx">origin</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-133"></a>    <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="k">return</span> <span class="nx">origin</span><span class="p">;</span>
<a name="cl-134"></a>    <span class="nx">origin</span> <span class="o">=</span> <span class="cp">[</span><span class="o">+</span><span class="nx">x</span><span class="err">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">,</span> <span class="o">+</span><span class="nx">x</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span><span class="p">];</span>
<a name="cl-135"></a>    <span class="k">return</span> <span class="nx">reload</span><span class="p">();</span>
<a name="cl-136"></a>  <span class="p">};</span>
<a name="cl-137"></a>
<a name="cl-138"></a>  <span class="nx">albers</span><span class="p">.</span><span class="nx">parallels</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-139"></a>    <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="k">return</span> <span class="nx">parallels</span><span class="p">;</span>
<a name="cl-140"></a>    <span class="nx">parallels</span> <span class="o">=</span> <span class="cp">[</span><span class="o">+</span><span class="nx">x</span><span class="err">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">,</span> <span class="o">+</span><span class="nx">x</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span><span class="p">];</span>
<a name="cl-141"></a>    <span class="k">return</span> <span class="nx">reload</span><span class="p">();</span>
<a name="cl-142"></a>  <span class="p">};</span>
<a name="cl-143"></a>
<a name="cl-144"></a>  <span class="nx">albers</span><span class="p">.</span><span class="nx">scale</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-145"></a>    <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="k">return</span> <span class="nx">scale</span><span class="p">;</span>
<a name="cl-146"></a>    <span class="nx">scale</span> <span class="o">=</span> <span class="o">+</span><span class="nx">x</span><span class="p">;</span>
<a name="cl-147"></a>    <span class="k">return</span> <span class="nx">albers</span><span class="p">;</span>
<a name="cl-148"></a>  <span class="p">};</span>
<a name="cl-149"></a>
<a name="cl-150"></a>  <span class="nx">albers</span><span class="p">.</span><span class="nx">translate</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-151"></a>    <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="k">return</span> <span class="nx">translate</span><span class="p">;</span>
<a name="cl-152"></a>    <span class="nx">translate</span> <span class="o">=</span> <span class="cp">[</span><span class="o">+</span><span class="nx">x</span><span class="err">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">,</span> <span class="o">+</span><span class="nx">x</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span><span class="p">];</span>
<a name="cl-153"></a>    <span class="k">return</span> <span class="nx">albers</span><span class="p">;</span>
<a name="cl-154"></a>  <span class="p">};</span>
<a name="cl-155"></a>
<a name="cl-156"></a>  <span class="k">return</span> <span class="nx">reload</span><span class="p">();</span>
<a name="cl-157"></a><span class="p">};</span>
<a name="cl-158"></a>
<a name="cl-159"></a><span class="c1">// A composite projection for the United States, 960x500. The set of standard</span>
<a name="cl-160"></a><span class="c1">// parallels for each region comes from USGS, which is published here:</span>
<a name="cl-161"></a><span class="c1">// http://egsc.usgs.gov/isb/pubs/MapProjections/projections.html#albers</span>
<a name="cl-162"></a><span class="c1">// TODO allow the composite projection to be rescaled?</span>
<a name="cl-163"></a><span class="nx">d3</span><span class="p">.</span><span class="nx">geo</span><span class="p">.</span><span class="nx">albersUsa</span> <span class="o">=</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
<a name="cl-164"></a>  <span class="kd">var</span> <span class="nx">lower48</span> <span class="o">=</span> <span class="nx">d3</span><span class="p">.</span><span class="nx">geo</span><span class="p">.</span><span class="nx">albers</span><span class="p">();</span>
<a name="cl-165"></a>
<a name="cl-166"></a>  <span class="kd">var</span> <span class="nx">alaska</span> <span class="o">=</span> <span class="nx">d3</span><span class="p">.</span><span class="nx">geo</span><span class="p">.</span><span class="nx">albers</span><span class="p">()</span>
<a name="cl-167"></a>      <span class="p">.</span><span class="nx">origin</span><span class="p">(</span><span class="cp">[</span><span class="o">-</span><span class="mi">160</span><span class="p">,</span> <span class="mi">60</span><span class="cp">]</span><span class="p">)</span>
<a name="cl-168"></a>      <span class="p">.</span><span class="nx">parallels</span><span class="p">(</span><span class="cp">[</span><span class="mi">55</span><span class="p">,</span> <span class="mi">65</span><span class="cp">]</span><span class="p">);</span>
<a name="cl-169"></a>
<a name="cl-170"></a>  <span class="kd">var</span> <span class="nx">hawaii</span> <span class="o">=</span> <span class="nx">d3</span><span class="p">.</span><span class="nx">geo</span><span class="p">.</span><span class="nx">albers</span><span class="p">()</span>
<a name="cl-171"></a>      <span class="p">.</span><span class="nx">origin</span><span class="p">(</span><span class="cp">[</span><span class="o">-</span><span class="mi">160</span><span class="p">,</span> <span class="mi">20</span><span class="cp">]</span><span class="p">)</span>
<a name="cl-172"></a>      <span class="p">.</span><span class="nx">parallels</span><span class="p">(</span><span class="cp">[</span><span class="mi">8</span><span class="p">,</span> <span class="mi">18</span><span class="cp">]</span><span class="p">);</span>
<a name="cl-173"></a>
<a name="cl-174"></a>  <span class="kd">var</span> <span class="nx">puertoRico</span> <span class="o">=</span> <span class="nx">d3</span><span class="p">.</span><span class="nx">geo</span><span class="p">.</span><span class="nx">albers</span><span class="p">()</span>
<a name="cl-175"></a>      <span class="p">.</span><span class="nx">origin</span><span class="p">(</span><span class="cp">[</span><span class="o">-</span><span class="mi">60</span><span class="p">,</span> <span class="mi">10</span><span class="cp">]</span><span class="p">)</span>
<a name="cl-176"></a>      <span class="p">.</span><span class="nx">parallels</span><span class="p">(</span><span class="cp">[</span><span class="mi">8</span><span class="p">,</span> <span class="mi">18</span><span class="cp">]</span><span class="p">);</span>
<a name="cl-177"></a>
<a name="cl-178"></a>  <span class="kd">function</span> <span class="nx">albersUsa</span><span class="p">(</span><span class="nx">coordinates</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-179"></a>    <span class="kd">var</span> <span class="nx">lon</span> <span class="o">=</span> <span class="nx">coordinates</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">,</span>
<a name="cl-180"></a>        <span class="nx">lat</span> <span class="o">=</span> <span class="nx">coordinates</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span><span class="p">;</span>
<a name="cl-181"></a>    <span class="k">return</span> <span class="p">(</span><span class="nx">lat</span> <span class="o">&gt;</span> <span class="mi">50</span> <span class="o">?</span> <span class="nx">alaska</span>
<a name="cl-182"></a>        <span class="o">:</span> <span class="nx">lon</span> <span class="o">&lt;</span> <span class="o">-</span><span class="mi">140</span> <span class="o">?</span> <span class="nx">hawaii</span>
<a name="cl-183"></a>        <span class="o">:</span> <span class="nx">lat</span> <span class="o">&lt;</span> <span class="mi">21</span> <span class="o">?</span> <span class="nx">puertoRico</span>
<a name="cl-184"></a>        <span class="o">:</span> <span class="nx">lower48</span><span class="p">)(</span><span class="nx">coordinates</span><span class="p">);</span>
<a name="cl-185"></a>  <span class="p">}</span>
<a name="cl-186"></a>
<a name="cl-187"></a>  <span class="nx">albersUsa</span><span class="p">.</span><span class="nx">scale</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-188"></a>    <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="k">return</span> <span class="nx">lower48</span><span class="p">.</span><span class="nx">scale</span><span class="p">();</span>
<a name="cl-189"></a>    <span class="nx">lower48</span><span class="p">.</span><span class="nx">scale</span><span class="p">(</span><span class="nx">x</span><span class="p">);</span>
<a name="cl-190"></a>    <span class="nx">alaska</span><span class="p">.</span><span class="nx">scale</span><span class="p">(</span><span class="nx">x</span> <span class="o">*</span> <span class="p">.</span><span class="mi">6</span><span class="p">);</span>
<a name="cl-191"></a>    <span class="nx">hawaii</span><span class="p">.</span><span class="nx">scale</span><span class="p">(</span><span class="nx">x</span><span class="p">);</span>
<a name="cl-192"></a>    <span class="nx">puertoRico</span><span class="p">.</span><span class="nx">scale</span><span class="p">(</span><span class="nx">x</span> <span class="o">*</span> <span class="mf">1.5</span><span class="p">);</span>
<a name="cl-193"></a>    <span class="k">return</span> <span class="nx">albersUsa</span><span class="p">.</span><span class="nx">translate</span><span class="p">(</span><span class="nx">lower48</span><span class="p">.</span><span class="nx">translate</span><span class="p">());</span>
<a name="cl-194"></a>  <span class="p">};</span>
<a name="cl-195"></a>
<a name="cl-196"></a>  <span class="nx">albersUsa</span><span class="p">.</span><span class="nx">translate</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-197"></a>    <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="k">return</span> <span class="nx">lower48</span><span class="p">.</span><span class="nx">translate</span><span class="p">();</span>
<a name="cl-198"></a>    <span class="kd">var</span> <span class="nx">dz</span> <span class="o">=</span> <span class="nx">lower48</span><span class="p">.</span><span class="nx">scale</span><span class="p">()</span> <span class="o">/</span> <span class="mi">1000</span><span class="p">,</span>
<a name="cl-199"></a>        <span class="nx">dx</span> <span class="o">=</span> <span class="nx">x</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">,</span>
<a name="cl-200"></a>        <span class="nx">dy</span> <span class="o">=</span> <span class="nx">x</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span><span class="p">;</span>
<a name="cl-201"></a>    <span class="nx">lower48</span><span class="p">.</span><span class="nx">translate</span><span class="p">(</span><span class="nx">x</span><span class="p">);</span>
<a name="cl-202"></a>    <span class="nx">alaska</span><span class="p">.</span><span class="nx">translate</span><span class="p">(</span><span class="cp">[</span><span class="nx">dx</span> <span class="o">-</span> <span class="mi">400</span> <span class="o">*</span> <span class="nx">dz</span><span class="p">,</span> <span class="nx">dy</span> <span class="o">+</span> <span class="mi">170</span> <span class="o">*</span> <span class="nx">dz</span><span class="cp">]</span><span class="p">);</span>
<a name="cl-203"></a>    <span class="nx">hawaii</span><span class="p">.</span><span class="nx">translate</span><span class="p">(</span><span class="cp">[</span><span class="nx">dx</span> <span class="o">-</span> <span class="mi">190</span> <span class="o">*</span> <span class="nx">dz</span><span class="p">,</span> <span class="nx">dy</span> <span class="o">+</span> <span class="mi">200</span> <span class="o">*</span> <span class="nx">dz</span><span class="cp">]</span><span class="p">);</span>
<a name="cl-204"></a>    <span class="nx">puertoRico</span><span class="p">.</span><span class="nx">translate</span><span class="p">(</span><span class="cp">[</span><span class="nx">dx</span> <span class="o">+</span> <span class="mi">580</span> <span class="o">*</span> <span class="nx">dz</span><span class="p">,</span> <span class="nx">dy</span> <span class="o">+</span> <span class="mi">430</span> <span class="o">*</span> <span class="nx">dz</span><span class="cp">]</span><span class="p">);</span>
<a name="cl-205"></a>    <span class="k">return</span> <span class="nx">albersUsa</span><span class="p">;</span>
<a name="cl-206"></a>  <span class="p">};</span>
<a name="cl-207"></a>
<a name="cl-208"></a>  <span class="k">return</span> <span class="nx">albersUsa</span><span class="p">.</span><span class="nx">scale</span><span class="p">(</span><span class="nx">lower48</span><span class="p">.</span><span class="nx">scale</span><span class="p">());</span>
<a name="cl-209"></a><span class="p">};</span>
<a name="cl-210"></a><span class="nx">d3</span><span class="p">.</span><span class="nx">geo</span><span class="p">.</span><span class="nx">bonne</span> <span class="o">=</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
<a name="cl-211"></a>  <span class="kd">var</span> <span class="nx">scale</span> <span class="o">=</span> <span class="mi">200</span><span class="p">,</span>
<a name="cl-212"></a>      <span class="nx">translate</span> <span class="o">=</span> <span class="cp">[</span><span class="mi">480</span><span class="p">,</span> <span class="mi">250</span><span class="cp">]</span><span class="p">,</span>
<a name="cl-213"></a>      <span class="nx">x0</span><span class="p">,</span> <span class="c1">// origin longitude in radians</span>
<a name="cl-214"></a>      <span class="nx">y0</span><span class="p">,</span> <span class="c1">// origin latitude in radians</span>
<a name="cl-215"></a>      <span class="nx">y1</span><span class="p">,</span> <span class="c1">// parallel latitude in radians</span>
<a name="cl-216"></a>      <span class="nx">c1</span><span class="p">;</span> <span class="c1">// cot(y1)</span>
<a name="cl-217"></a>
<a name="cl-218"></a>  <span class="kd">function</span> <span class="nx">bonne</span><span class="p">(</span><span class="nx">coordinates</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-219"></a>    <span class="kd">var</span> <span class="nx">x</span> <span class="o">=</span> <span class="nx">coordinates</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span> <span class="o">*</span> <span class="nx">d3_geo_radians</span> <span class="o">-</span> <span class="nx">x0</span><span class="p">,</span>
<a name="cl-220"></a>        <span class="nx">y</span> <span class="o">=</span> <span class="nx">coordinates</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span> <span class="o">*</span> <span class="nx">d3_geo_radians</span> <span class="o">-</span> <span class="nx">y0</span><span class="p">;</span>
<a name="cl-221"></a>    <span class="k">if</span> <span class="p">(</span><span class="nx">y1</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-222"></a>      <span class="kd">var</span> <span class="nx">p</span> <span class="o">=</span> <span class="nx">c1</span> <span class="o">+</span> <span class="nx">y1</span> <span class="o">-</span> <span class="nx">y</span><span class="p">,</span> <span class="nx">E</span> <span class="o">=</span> <span class="nx">x</span> <span class="o">*</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">cos</span><span class="p">(</span><span class="nx">y</span><span class="p">)</span> <span class="o">/</span> <span class="nx">p</span><span class="p">;</span>
<a name="cl-223"></a>      <span class="nx">x</span> <span class="o">=</span> <span class="nx">p</span> <span class="o">*</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">sin</span><span class="p">(</span><span class="nx">E</span><span class="p">);</span>
<a name="cl-224"></a>      <span class="nx">y</span> <span class="o">=</span> <span class="nx">p</span> <span class="o">*</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">cos</span><span class="p">(</span><span class="nx">E</span><span class="p">)</span> <span class="o">-</span> <span class="nx">c1</span><span class="p">;</span>
<a name="cl-225"></a>    <span class="p">}</span> <span class="k">else</span> <span class="p">{</span>
<a name="cl-226"></a>      <span class="nx">x</span> <span class="o">*=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">cos</span><span class="p">(</span><span class="nx">y</span><span class="p">);</span>
<a name="cl-227"></a>      <span class="nx">y</span> <span class="o">*=</span> <span class="o">-</span><span class="mi">1</span><span class="p">;</span>
<a name="cl-228"></a>    <span class="p">}</span>
<a name="cl-229"></a>    <span class="k">return</span> <span class="cp">[</span>
<a name="cl-230"></a>      <span class="nx">scale</span> <span class="o">*</span> <span class="nx">x</span> <span class="o">+</span> <span class="nx">translate</span><span class="err">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">,</span>
<a name="cl-231"></a>      <span class="nx">scale</span> <span class="o">*</span> <span class="nx">y</span> <span class="o">+</span> <span class="nx">translate</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span>
<a name="cl-232"></a>    <span class="p">];</span>
<a name="cl-233"></a>  <span class="p">}</span>
<a name="cl-234"></a>
<a name="cl-235"></a>  <span class="nx">bonne</span><span class="p">.</span><span class="nx">invert</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">coordinates</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-236"></a>    <span class="kd">var</span> <span class="nx">x</span> <span class="o">=</span> <span class="p">(</span><span class="nx">coordinates</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span> <span class="o">-</span> <span class="nx">translate</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">)</span> <span class="o">/</span> <span class="nx">scale</span><span class="p">,</span>
<a name="cl-237"></a>        <span class="nx">y</span> <span class="o">=</span> <span class="p">(</span><span class="nx">coordinates</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span> <span class="o">-</span> <span class="nx">translate</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span><span class="p">)</span> <span class="o">/</span> <span class="nx">scale</span><span class="p">;</span>
<a name="cl-238"></a>    <span class="k">if</span> <span class="p">(</span><span class="nx">y1</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-239"></a>      <span class="kd">var</span> <span class="nx">c</span> <span class="o">=</span> <span class="nx">c1</span> <span class="o">+</span> <span class="nx">y</span><span class="p">,</span> <span class="nx">p</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">sqrt</span><span class="p">(</span><span class="nx">x</span> <span class="o">*</span> <span class="nx">x</span> <span class="o">+</span> <span class="nx">c</span> <span class="o">*</span> <span class="nx">c</span><span class="p">);</span>
<a name="cl-240"></a>      <span class="nx">y</span> <span class="o">=</span> <span class="nx">c1</span> <span class="o">+</span> <span class="nx">y1</span> <span class="o">-</span> <span class="nx">p</span><span class="p">;</span>
<a name="cl-241"></a>      <span class="nx">x</span> <span class="o">=</span> <span class="nx">x0</span> <span class="o">+</span> <span class="nx">p</span> <span class="o">*</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">atan2</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="nx">c</span><span class="p">)</span> <span class="o">/</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">cos</span><span class="p">(</span><span class="nx">y</span><span class="p">);</span>
<a name="cl-242"></a>    <span class="p">}</span> <span class="k">else</span> <span class="p">{</span>
<a name="cl-243"></a>      <span class="nx">y</span> <span class="o">*=</span> <span class="o">-</span><span class="mi">1</span><span class="p">;</span>
<a name="cl-244"></a>      <span class="nx">x</span> <span class="o">/=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">cos</span><span class="p">(</span><span class="nx">y</span><span class="p">);</span>
<a name="cl-245"></a>    <span class="p">}</span>
<a name="cl-246"></a>    <span class="k">return</span> <span class="cp">[</span>
<a name="cl-247"></a>      <span class="nx">x</span> <span class="o">/</span> <span class="nx">d3_geo_radians</span><span class="p">,</span>
<a name="cl-248"></a>      <span class="nx">y</span> <span class="o">/</span> <span class="nx">d3_geo_radians</span>
<a name="cl-249"></a>    <span class="cp">]</span><span class="p">;</span>
<a name="cl-250"></a>  <span class="p">};</span>
<a name="cl-251"></a>
<a name="cl-252"></a>  <span class="c1">// 90° for Werner, 0° for Sinusoidal</span>
<a name="cl-253"></a>  <span class="nx">bonne</span><span class="p">.</span><span class="nx">parallel</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-254"></a>    <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="k">return</span> <span class="nx">y1</span> <span class="o">/</span> <span class="nx">d3_geo_radians</span><span class="p">;</span>
<a name="cl-255"></a>    <span class="nx">c1</span> <span class="o">=</span> <span class="mi">1</span> <span class="o">/</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">tan</span><span class="p">(</span><span class="nx">y1</span> <span class="o">=</span> <span class="nx">x</span> <span class="o">*</span> <span class="nx">d3_geo_radians</span><span class="p">);</span>
<a name="cl-256"></a>    <span class="k">return</span> <span class="nx">bonne</span><span class="p">;</span>
<a name="cl-257"></a>  <span class="p">};</span>
<a name="cl-258"></a>
<a name="cl-259"></a>  <span class="nx">bonne</span><span class="p">.</span><span class="nx">origin</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-260"></a>    <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="k">return</span> <span class="cp">[</span><span class="nx">x0</span> <span class="o">/</span> <span class="nx">d3_geo_radians</span><span class="p">,</span> <span class="nx">y0</span> <span class="o">/</span> <span class="nx">d3_geo_radians</span><span class="cp">]</span><span class="p">;</span>
<a name="cl-261"></a>    <span class="nx">x0</span> <span class="o">=</span> <span class="nx">x</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span> <span class="o">*</span> <span class="nx">d3_geo_radians</span><span class="p">;</span>
<a name="cl-262"></a>    <span class="nx">y0</span> <span class="o">=</span> <span class="nx">x</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span> <span class="o">*</span> <span class="nx">d3_geo_radians</span><span class="p">;</span>
<a name="cl-263"></a>    <span class="k">return</span> <span class="nx">bonne</span><span class="p">;</span>
<a name="cl-264"></a>  <span class="p">};</span>
<a name="cl-265"></a>
<a name="cl-266"></a>  <span class="nx">bonne</span><span class="p">.</span><span class="nx">scale</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-267"></a>    <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="k">return</span> <span class="nx">scale</span><span class="p">;</span>
<a name="cl-268"></a>    <span class="nx">scale</span> <span class="o">=</span> <span class="o">+</span><span class="nx">x</span><span class="p">;</span>
<a name="cl-269"></a>    <span class="k">return</span> <span class="nx">bonne</span><span class="p">;</span>
<a name="cl-270"></a>  <span class="p">};</span>
<a name="cl-271"></a>
<a name="cl-272"></a>  <span class="nx">bonne</span><span class="p">.</span><span class="nx">translate</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-273"></a>    <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="k">return</span> <span class="nx">translate</span><span class="p">;</span>
<a name="cl-274"></a>    <span class="nx">translate</span> <span class="o">=</span> <span class="cp">[</span><span class="o">+</span><span class="nx">x</span><span class="err">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">,</span> <span class="o">+</span><span class="nx">x</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span><span class="p">];</span>
<a name="cl-275"></a>    <span class="k">return</span> <span class="nx">bonne</span><span class="p">;</span>
<a name="cl-276"></a>  <span class="p">};</span>
<a name="cl-277"></a>
<a name="cl-278"></a>  <span class="k">return</span> <span class="nx">bonne</span><span class="p">.</span><span class="nx">origin</span><span class="p">(</span><span class="cp">[</span><span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="cp">]</span><span class="p">).</span><span class="nx">parallel</span><span class="p">(</span><span class="mi">45</span><span class="p">);</span>
<a name="cl-279"></a><span class="p">};</span>
<a name="cl-280"></a><span class="nx">d3</span><span class="p">.</span><span class="nx">geo</span><span class="p">.</span><span class="nx">equirectangular</span> <span class="o">=</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
<a name="cl-281"></a>  <span class="kd">var</span> <span class="nx">scale</span> <span class="o">=</span> <span class="mi">500</span><span class="p">,</span>
<a name="cl-282"></a>      <span class="nx">translate</span> <span class="o">=</span> <span class="cp">[</span><span class="mi">480</span><span class="p">,</span> <span class="mi">250</span><span class="cp">]</span><span class="p">;</span>
<a name="cl-283"></a>
<a name="cl-284"></a>  <span class="kd">function</span> <span class="nx">equirectangular</span><span class="p">(</span><span class="nx">coordinates</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-285"></a>    <span class="kd">var</span> <span class="nx">x</span> <span class="o">=</span> <span class="nx">coordinates</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span> <span class="o">/</span> <span class="mi">360</span><span class="p">,</span>
<a name="cl-286"></a>        <span class="nx">y</span> <span class="o">=</span> <span class="o">-</span><span class="nx">coordinates</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span> <span class="o">/</span> <span class="mi">360</span><span class="p">;</span>
<a name="cl-287"></a>    <span class="k">return</span> <span class="cp">[</span>
<a name="cl-288"></a>      <span class="nx">scale</span> <span class="o">*</span> <span class="nx">x</span> <span class="o">+</span> <span class="nx">translate</span><span class="err">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">,</span>
<a name="cl-289"></a>      <span class="nx">scale</span> <span class="o">*</span> <span class="nx">y</span> <span class="o">+</span> <span class="nx">translate</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span>
<a name="cl-290"></a>    <span class="p">];</span>
<a name="cl-291"></a>  <span class="p">}</span>
<a name="cl-292"></a>
<a name="cl-293"></a>  <span class="nx">equirectangular</span><span class="p">.</span><span class="nx">invert</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">coordinates</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-294"></a>    <span class="kd">var</span> <span class="nx">x</span> <span class="o">=</span> <span class="p">(</span><span class="nx">coordinates</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span> <span class="o">-</span> <span class="nx">translate</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">)</span> <span class="o">/</span> <span class="nx">scale</span><span class="p">,</span>
<a name="cl-295"></a>        <span class="nx">y</span> <span class="o">=</span> <span class="p">(</span><span class="nx">coordinates</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span> <span class="o">-</span> <span class="nx">translate</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span><span class="p">)</span> <span class="o">/</span> <span class="nx">scale</span><span class="p">;</span>
<a name="cl-296"></a>    <span class="k">return</span> <span class="cp">[</span>
<a name="cl-297"></a>      <span class="mi">360</span> <span class="o">*</span> <span class="nx">x</span><span class="p">,</span>
<a name="cl-298"></a>      <span class="o">-</span><span class="mi">360</span> <span class="o">*</span> <span class="nx">y</span>
<a name="cl-299"></a>    <span class="cp">]</span><span class="p">;</span>
<a name="cl-300"></a>  <span class="p">};</span>
<a name="cl-301"></a>
<a name="cl-302"></a>  <span class="nx">equirectangular</span><span class="p">.</span><span class="nx">scale</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-303"></a>    <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="k">return</span> <span class="nx">scale</span><span class="p">;</span>
<a name="cl-304"></a>    <span class="nx">scale</span> <span class="o">=</span> <span class="o">+</span><span class="nx">x</span><span class="p">;</span>
<a name="cl-305"></a>    <span class="k">return</span> <span class="nx">equirectangular</span><span class="p">;</span>
<a name="cl-306"></a>  <span class="p">};</span>
<a name="cl-307"></a>
<a name="cl-308"></a>  <span class="nx">equirectangular</span><span class="p">.</span><span class="nx">translate</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-309"></a>    <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="k">return</span> <span class="nx">translate</span><span class="p">;</span>
<a name="cl-310"></a>    <span class="nx">translate</span> <span class="o">=</span> <span class="cp">[</span><span class="o">+</span><span class="nx">x</span><span class="err">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">,</span> <span class="o">+</span><span class="nx">x</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span><span class="p">];</span>
<a name="cl-311"></a>    <span class="k">return</span> <span class="nx">equirectangular</span><span class="p">;</span>
<a name="cl-312"></a>  <span class="p">};</span>
<a name="cl-313"></a>
<a name="cl-314"></a>  <span class="k">return</span> <span class="nx">equirectangular</span><span class="p">;</span>
<a name="cl-315"></a><span class="p">};</span>
<a name="cl-316"></a><span class="nx">d3</span><span class="p">.</span><span class="nx">geo</span><span class="p">.</span><span class="nx">mercator</span> <span class="o">=</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
<a name="cl-317"></a>  <span class="kd">var</span> <span class="nx">scale</span> <span class="o">=</span> <span class="mi">500</span><span class="p">,</span>
<a name="cl-318"></a>      <span class="nx">translate</span> <span class="o">=</span> <span class="cp">[</span><span class="mi">480</span><span class="p">,</span> <span class="mi">250</span><span class="cp">]</span><span class="p">;</span>
<a name="cl-319"></a>
<a name="cl-320"></a>  <span class="kd">function</span> <span class="nx">mercator</span><span class="p">(</span><span class="nx">coordinates</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-321"></a>    <span class="kd">var</span> <span class="nx">x</span> <span class="o">=</span> <span class="nx">coordinates</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span> <span class="o">/</span> <span class="mi">360</span><span class="p">,</span>
<a name="cl-322"></a>        <span class="nx">y</span> <span class="o">=</span> <span class="o">-</span><span class="p">(</span><span class="nb">Math</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nb">Math</span><span class="p">.</span><span class="nx">tan</span><span class="p">(</span><span class="nb">Math</span><span class="p">.</span><span class="nx">PI</span> <span class="o">/</span> <span class="mi">4</span> <span class="o">+</span> <span class="nx">coordinates</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span> <span class="o">*</span> <span class="nx">d3_geo_radians</span> <span class="o">/</span> <span class="mi">2</span><span class="p">))</span> <span class="o">/</span> <span class="nx">d3_geo_radians</span><span class="p">)</span> <span class="o">/</span> <span class="mi">360</span><span class="p">;</span>
<a name="cl-323"></a>    <span class="k">return</span> <span class="cp">[</span>
<a name="cl-324"></a>      <span class="nx">scale</span> <span class="o">*</span> <span class="nx">x</span> <span class="o">+</span> <span class="nx">translate</span><span class="err">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">,</span>
<a name="cl-325"></a>      <span class="nx">scale</span> <span class="o">*</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">max</span><span class="p">(</span><span class="o">-</span><span class="p">.</span><span class="mi">5</span><span class="p">,</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">min</span><span class="p">(.</span><span class="mi">5</span><span class="p">,</span> <span class="nx">y</span><span class="p">))</span> <span class="o">+</span> <span class="nx">translate</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span>
<a name="cl-326"></a>    <span class="p">];</span>
<a name="cl-327"></a>  <span class="p">}</span>
<a name="cl-328"></a>
<a name="cl-329"></a>  <span class="nx">mercator</span><span class="p">.</span><span class="nx">invert</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">coordinates</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-330"></a>    <span class="kd">var</span> <span class="nx">x</span> <span class="o">=</span> <span class="p">(</span><span class="nx">coordinates</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span> <span class="o">-</span> <span class="nx">translate</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">)</span> <span class="o">/</span> <span class="nx">scale</span><span class="p">,</span>
<a name="cl-331"></a>        <span class="nx">y</span> <span class="o">=</span> <span class="p">(</span><span class="nx">coordinates</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span> <span class="o">-</span> <span class="nx">translate</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span><span class="p">)</span> <span class="o">/</span> <span class="nx">scale</span><span class="p">;</span>
<a name="cl-332"></a>    <span class="k">return</span> <span class="cp">[</span>
<a name="cl-333"></a>      <span class="mi">360</span> <span class="o">*</span> <span class="nx">x</span><span class="p">,</span>
<a name="cl-334"></a>      <span class="mi">2</span> <span class="o">*</span> <span class="nx">Math.atan</span><span class="p">(</span><span class="nx">Math.exp</span><span class="p">(</span><span class="o">-</span><span class="mi">360</span> <span class="o">*</span> <span class="nx">y</span> <span class="o">*</span> <span class="nx">d3_geo_radians</span><span class="p">))</span> <span class="o">/</span> <span class="nx">d3_geo_radians</span> <span class="o">-</span> <span class="mi">90</span>
<a name="cl-335"></a>    <span class="cp">]</span><span class="p">;</span>
<a name="cl-336"></a>  <span class="p">};</span>
<a name="cl-337"></a>
<a name="cl-338"></a>  <span class="nx">mercator</span><span class="p">.</span><span class="nx">scale</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-339"></a>    <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="k">return</span> <span class="nx">scale</span><span class="p">;</span>
<a name="cl-340"></a>    <span class="nx">scale</span> <span class="o">=</span> <span class="o">+</span><span class="nx">x</span><span class="p">;</span>
<a name="cl-341"></a>    <span class="k">return</span> <span class="nx">mercator</span><span class="p">;</span>
<a name="cl-342"></a>  <span class="p">};</span>
<a name="cl-343"></a>
<a name="cl-344"></a>  <span class="nx">mercator</span><span class="p">.</span><span class="nx">translate</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-345"></a>    <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="k">return</span> <span class="nx">translate</span><span class="p">;</span>
<a name="cl-346"></a>    <span class="nx">translate</span> <span class="o">=</span> <span class="cp">[</span><span class="o">+</span><span class="nx">x</span><span class="err">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">,</span> <span class="o">+</span><span class="nx">x</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span><span class="p">];</span>
<a name="cl-347"></a>    <span class="k">return</span> <span class="nx">mercator</span><span class="p">;</span>
<a name="cl-348"></a>  <span class="p">};</span>
<a name="cl-349"></a>
<a name="cl-350"></a>  <span class="k">return</span> <span class="nx">mercator</span><span class="p">;</span>
<a name="cl-351"></a><span class="p">};</span>
<a name="cl-352"></a><span class="kd">function</span> <span class="nx">d3_geo_type</span><span class="p">(</span><span class="nx">types</span><span class="p">,</span> <span class="nx">defaultValue</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-353"></a>  <span class="k">return</span> <span class="kd">function</span><span class="p">(</span><span class="nx">object</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-354"></a>    <span class="k">return</span> <span class="nx">object</span> <span class="o">&amp;&amp;</span> <span class="nx">object</span><span class="p">.</span><span class="nx">type</span> <span class="k">in</span> <span class="nx">types</span> <span class="o">?</span> <span class="nx">types</span><span class="cp">[</span><span class="nx">object.type</span><span class="cp">]</span><span class="p">(</span><span class="nx">object</span><span class="p">)</span> <span class="o">:</span> <span class="nx">defaultValue</span><span class="p">;</span>
<a name="cl-355"></a>  <span class="p">};</span>
<a name="cl-356"></a><span class="p">}</span>
<a name="cl-357"></a><span class="cm">/**</span>
<a name="cl-358"></a><span class="cm"> * Returns a function that, given a GeoJSON object (e.g., a feature), returns</span>
<a name="cl-359"></a><span class="cm"> * the corresponding SVG path. The function can be customized by overriding the</span>
<a name="cl-360"></a><span class="cm"> * projection. Point features are mapped to circles with a default radius of</span>
<a name="cl-361"></a><span class="cm"> * 4.5px; the radius can be specified either as a constant or a function that</span>
<a name="cl-362"></a><span class="cm"> * is evaluated per object.</span>
<a name="cl-363"></a><span class="cm"> */</span>
<a name="cl-364"></a><span class="nx">d3</span><span class="p">.</span><span class="nx">geo</span><span class="p">.</span><span class="nx">path</span> <span class="o">=</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
<a name="cl-365"></a>  <span class="kd">var</span> <span class="nx">pointRadius</span> <span class="o">=</span> <span class="mf">4.5</span><span class="p">,</span>
<a name="cl-366"></a>      <span class="nx">pointCircle</span> <span class="o">=</span> <span class="nx">d3_path_circle</span><span class="p">(</span><span class="nx">pointRadius</span><span class="p">),</span>
<a name="cl-367"></a>      <span class="nx">projection</span> <span class="o">=</span> <span class="nx">d3</span><span class="p">.</span><span class="nx">geo</span><span class="p">.</span><span class="nx">albersUsa</span><span class="p">();</span>
<a name="cl-368"></a>
<a name="cl-369"></a>  <span class="kd">function</span> <span class="nx">path</span><span class="p">(</span><span class="nx">d</span><span class="p">,</span> <span class="nx">i</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-370"></a>    <span class="k">if</span> <span class="p">(</span><span class="k">typeof</span> <span class="nx">pointRadius</span> <span class="o">===</span> <span class="s2">&quot;function&quot;</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-371"></a>      <span class="nx">pointCircle</span> <span class="o">=</span> <span class="nx">d3_path_circle</span><span class="p">(</span><span class="nx">pointRadius</span><span class="p">.</span><span class="nx">apply</span><span class="p">(</span><span class="k">this</span><span class="p">,</span> <span class="nx">arguments</span><span class="p">));</span>
<a name="cl-372"></a>    <span class="p">}</span>
<a name="cl-373"></a>    <span class="k">return</span> <span class="nx">pathType</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="o">||</span> <span class="kc">null</span><span class="p">;</span>
<a name="cl-374"></a>  <span class="p">}</span>
<a name="cl-375"></a>
<a name="cl-376"></a>  <span class="kd">function</span> <span class="nx">project</span><span class="p">(</span><span class="nx">coordinates</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-377"></a>    <span class="k">return</span> <span class="nx">projection</span><span class="p">(</span><span class="nx">coordinates</span><span class="p">).</span><span class="nx">join</span><span class="p">(</span><span class="s2">&quot;,&quot;</span><span class="p">);</span>
<a name="cl-378"></a>  <span class="p">}</span>
<a name="cl-379"></a>
<a name="cl-380"></a>  <span class="kd">var</span> <span class="nx">pathType</span> <span class="o">=</span> <span class="nx">d3_geo_type</span><span class="p">({</span>
<a name="cl-381"></a>
<a name="cl-382"></a>    <span class="nx">FeatureCollection</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-383"></a>      <span class="kd">var</span> <span class="nx">path</span> <span class="o">=</span> <span class="cp">[]</span><span class="p">,</span>
<a name="cl-384"></a>          <span class="nx">features</span> <span class="o">=</span> <span class="nx">o</span><span class="p">.</span><span class="nx">features</span><span class="p">,</span>
<a name="cl-385"></a>          <span class="nx">i</span> <span class="o">=</span> <span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="c1">// features.index</span>
<a name="cl-386"></a>          <span class="nx">n</span> <span class="o">=</span> <span class="nx">features</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span>
<a name="cl-387"></a>      <span class="k">while</span> <span class="p">(</span><span class="o">++</span><span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">n</span><span class="p">)</span> <span class="nx">path</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">pathType</span><span class="p">(</span><span class="nx">features</span><span class="cp">[</span><span class="nx">i</span><span class="cp">]</span><span class="p">.</span><span class="nx">geometry</span><span class="p">));</span>
<a name="cl-388"></a>      <span class="k">return</span> <span class="nx">path</span><span class="p">.</span><span class="nx">join</span><span class="p">(</span><span class="s2">&quot;&quot;</span><span class="p">);</span>
<a name="cl-389"></a>    <span class="p">},</span>
<a name="cl-390"></a>
<a name="cl-391"></a>    <span class="nx">Feature</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-392"></a>      <span class="k">return</span> <span class="nx">pathType</span><span class="p">(</span><span class="nx">o</span><span class="p">.</span><span class="nx">geometry</span><span class="p">);</span>
<a name="cl-393"></a>    <span class="p">},</span>
<a name="cl-394"></a>
<a name="cl-395"></a>    <span class="nx">Point</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-396"></a>      <span class="k">return</span> <span class="s2">&quot;M&quot;</span> <span class="o">+</span> <span class="nx">project</span><span class="p">(</span><span class="nx">o</span><span class="p">.</span><span class="nx">coordinates</span><span class="p">)</span> <span class="o">+</span> <span class="nx">pointCircle</span><span class="p">;</span>
<a name="cl-397"></a>    <span class="p">},</span>
<a name="cl-398"></a>
<a name="cl-399"></a>    <span class="nx">MultiPoint</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-400"></a>      <span class="kd">var</span> <span class="nx">path</span> <span class="o">=</span> <span class="cp">[]</span><span class="p">,</span>
<a name="cl-401"></a>          <span class="nx">coordinates</span> <span class="o">=</span> <span class="nx">o</span><span class="p">.</span><span class="nx">coordinates</span><span class="p">,</span>
<a name="cl-402"></a>          <span class="nx">i</span> <span class="o">=</span> <span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="c1">// coordinates.index</span>
<a name="cl-403"></a>          <span class="nx">n</span> <span class="o">=</span> <span class="nx">coordinates</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span>
<a name="cl-404"></a>      <span class="k">while</span> <span class="p">(</span><span class="o">++</span><span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">n</span><span class="p">)</span> <span class="nx">path</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="s2">&quot;M&quot;</span><span class="p">,</span> <span class="nx">project</span><span class="p">(</span><span class="nx">coordinates</span><span class="cp">[</span><span class="nx">i</span><span class="cp">]</span><span class="p">),</span> <span class="nx">pointCircle</span><span class="p">);</span>
<a name="cl-405"></a>      <span class="k">return</span> <span class="nx">path</span><span class="p">.</span><span class="nx">join</span><span class="p">(</span><span class="s2">&quot;&quot;</span><span class="p">);</span>
<a name="cl-406"></a>    <span class="p">},</span>
<a name="cl-407"></a>
<a name="cl-408"></a>    <span class="nx">LineString</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-409"></a>      <span class="kd">var</span> <span class="nx">path</span> <span class="o">=</span> <span class="cp">[</span><span class="s2">&quot;M&quot;</span><span class="cp">]</span><span class="p">,</span>
<a name="cl-410"></a>          <span class="nx">coordinates</span> <span class="o">=</span> <span class="nx">o</span><span class="p">.</span><span class="nx">coordinates</span><span class="p">,</span>
<a name="cl-411"></a>          <span class="nx">i</span> <span class="o">=</span> <span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="c1">// coordinates.index</span>
<a name="cl-412"></a>          <span class="nx">n</span> <span class="o">=</span> <span class="nx">coordinates</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span>
<a name="cl-413"></a>      <span class="k">while</span> <span class="p">(</span><span class="o">++</span><span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">n</span><span class="p">)</span> <span class="nx">path</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">project</span><span class="p">(</span><span class="nx">coordinates</span><span class="cp">[</span><span class="nx">i</span><span class="cp">]</span><span class="p">),</span> <span class="s2">&quot;L&quot;</span><span class="p">);</span>
<a name="cl-414"></a>      <span class="nx">path</span><span class="p">.</span><span class="nx">pop</span><span class="p">();</span>
<a name="cl-415"></a>      <span class="k">return</span> <span class="nx">path</span><span class="p">.</span><span class="nx">join</span><span class="p">(</span><span class="s2">&quot;&quot;</span><span class="p">);</span>
<a name="cl-416"></a>    <span class="p">},</span>
<a name="cl-417"></a>
<a name="cl-418"></a>    <span class="nx">MultiLineString</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-419"></a>      <span class="kd">var</span> <span class="nx">path</span> <span class="o">=</span> <span class="cp">[]</span><span class="p">,</span>
<a name="cl-420"></a>          <span class="nx">coordinates</span> <span class="o">=</span> <span class="nx">o</span><span class="p">.</span><span class="nx">coordinates</span><span class="p">,</span>
<a name="cl-421"></a>          <span class="nx">i</span> <span class="o">=</span> <span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="c1">// coordinates.index</span>
<a name="cl-422"></a>          <span class="nx">n</span> <span class="o">=</span> <span class="nx">coordinates</span><span class="p">.</span><span class="nx">length</span><span class="p">,</span>
<a name="cl-423"></a>          <span class="nx">subcoordinates</span><span class="p">,</span> <span class="c1">// coordinates</span><span class="cp">[</span><span class="nx">i</span><span class="cp">]</span><span class="c1"></span>
<a name="cl-424"></a>          <span class="nx">j</span><span class="p">,</span> <span class="c1">// subcoordinates.index</span>
<a name="cl-425"></a>          <span class="nx">m</span><span class="p">;</span> <span class="c1">// subcoordinates.length</span>
<a name="cl-426"></a>      <span class="k">while</span> <span class="p">(</span><span class="o">++</span><span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">n</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-427"></a>        <span class="nx">subcoordinates</span> <span class="o">=</span> <span class="nx">coordinates</span><span class="cp">[</span><span class="nx">i</span><span class="cp">]</span><span class="p">;</span>
<a name="cl-428"></a>        <span class="nx">j</span> <span class="o">=</span> <span class="o">-</span><span class="mi">1</span><span class="p">;</span>
<a name="cl-429"></a>        <span class="nx">m</span> <span class="o">=</span> <span class="nx">subcoordinates</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span>
<a name="cl-430"></a>        <span class="nx">path</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="s2">&quot;M&quot;</span><span class="p">);</span>
<a name="cl-431"></a>        <span class="k">while</span> <span class="p">(</span><span class="o">++</span><span class="nx">j</span> <span class="o">&lt;</span> <span class="nx">m</span><span class="p">)</span> <span class="nx">path</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">project</span><span class="p">(</span><span class="nx">subcoordinates</span><span class="cp">[</span><span class="nx">j</span><span class="cp">]</span><span class="p">),</span> <span class="s2">&quot;L&quot;</span><span class="p">);</span>
<a name="cl-432"></a>        <span class="nx">path</span><span class="p">.</span><span class="nx">pop</span><span class="p">();</span>
<a name="cl-433"></a>      <span class="p">}</span>
<a name="cl-434"></a>      <span class="k">return</span> <span class="nx">path</span><span class="p">.</span><span class="nx">join</span><span class="p">(</span><span class="s2">&quot;&quot;</span><span class="p">);</span>
<a name="cl-435"></a>    <span class="p">},</span>
<a name="cl-436"></a>
<a name="cl-437"></a>    <span class="nx">Polygon</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-438"></a>      <span class="kd">var</span> <span class="nx">path</span> <span class="o">=</span> <span class="cp">[]</span><span class="p">,</span>
<a name="cl-439"></a>          <span class="nx">coordinates</span> <span class="o">=</span> <span class="nx">o</span><span class="p">.</span><span class="nx">coordinates</span><span class="p">,</span>
<a name="cl-440"></a>          <span class="nx">i</span> <span class="o">=</span> <span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="c1">// coordinates.index</span>
<a name="cl-441"></a>          <span class="nx">n</span> <span class="o">=</span> <span class="nx">coordinates</span><span class="p">.</span><span class="nx">length</span><span class="p">,</span>
<a name="cl-442"></a>          <span class="nx">subcoordinates</span><span class="p">,</span> <span class="c1">// coordinates</span><span class="cp">[</span><span class="nx">i</span><span class="cp">]</span><span class="c1"></span>
<a name="cl-443"></a>          <span class="nx">j</span><span class="p">,</span> <span class="c1">// subcoordinates.index</span>
<a name="cl-444"></a>          <span class="nx">m</span><span class="p">;</span> <span class="c1">// subcoordinates.length</span>
<a name="cl-445"></a>      <span class="k">while</span> <span class="p">(</span><span class="o">++</span><span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">n</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-446"></a>        <span class="nx">subcoordinates</span> <span class="o">=</span> <span class="nx">coordinates</span><span class="cp">[</span><span class="nx">i</span><span class="cp">]</span><span class="p">;</span>
<a name="cl-447"></a>        <span class="nx">j</span> <span class="o">=</span> <span class="o">-</span><span class="mi">1</span><span class="p">;</span>
<a name="cl-448"></a>        <span class="k">if</span> <span class="p">((</span><span class="nx">m</span> <span class="o">=</span> <span class="nx">subcoordinates</span><span class="p">.</span><span class="nx">length</span> <span class="o">-</span> <span class="mi">1</span><span class="p">)</span> <span class="o">&gt;</span> <span class="mi">0</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-449"></a>          <span class="nx">path</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="s2">&quot;M&quot;</span><span class="p">);</span>
<a name="cl-450"></a>          <span class="k">while</span> <span class="p">(</span><span class="o">++</span><span class="nx">j</span> <span class="o">&lt;</span> <span class="nx">m</span><span class="p">)</span> <span class="nx">path</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">project</span><span class="p">(</span><span class="nx">subcoordinates</span><span class="cp">[</span><span class="nx">j</span><span class="cp">]</span><span class="p">),</span> <span class="s2">&quot;L&quot;</span><span class="p">);</span>
<a name="cl-451"></a>          <span class="nx">path</span><span class="cp">[</span><span class="nx">path.length</span> <span class="o">-</span> <span class="mi">1</span><span class="cp">]</span> <span class="o">=</span> <span class="s2">&quot;Z&quot;</span><span class="p">;</span>
<a name="cl-452"></a>        <span class="p">}</span>
<a name="cl-453"></a>      <span class="p">}</span>
<a name="cl-454"></a>      <span class="k">return</span> <span class="nx">path</span><span class="p">.</span><span class="nx">join</span><span class="p">(</span><span class="s2">&quot;&quot;</span><span class="p">);</span>
<a name="cl-455"></a>    <span class="p">},</span>
<a name="cl-456"></a>
<a name="cl-457"></a>    <span class="nx">MultiPolygon</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-458"></a>      <span class="kd">var</span> <span class="nx">path</span> <span class="o">=</span> <span class="cp">[]</span><span class="p">,</span>
<a name="cl-459"></a>          <span class="nx">coordinates</span> <span class="o">=</span> <span class="nx">o</span><span class="p">.</span><span class="nx">coordinates</span><span class="p">,</span>
<a name="cl-460"></a>          <span class="nx">i</span> <span class="o">=</span> <span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="c1">// coordinates index</span>
<a name="cl-461"></a>          <span class="nx">n</span> <span class="o">=</span> <span class="nx">coordinates</span><span class="p">.</span><span class="nx">length</span><span class="p">,</span>
<a name="cl-462"></a>          <span class="nx">subcoordinates</span><span class="p">,</span> <span class="c1">// coordinates</span><span class="cp">[</span><span class="nx">i</span><span class="cp">]</span><span class="c1"></span>
<a name="cl-463"></a>          <span class="nx">j</span><span class="p">,</span> <span class="c1">// subcoordinates index</span>
<a name="cl-464"></a>          <span class="nx">m</span><span class="p">,</span> <span class="c1">// subcoordinates.length</span>
<a name="cl-465"></a>          <span class="nx">subsubcoordinates</span><span class="p">,</span> <span class="c1">// subcoordinates</span><span class="cp">[</span><span class="nx">j</span><span class="cp">]</span><span class="c1"></span>
<a name="cl-466"></a>          <span class="nx">k</span><span class="p">,</span> <span class="c1">// subsubcoordinates index</span>
<a name="cl-467"></a>          <span class="nx">p</span><span class="p">;</span> <span class="c1">// subsubcoordinates.length</span>
<a name="cl-468"></a>      <span class="k">while</span> <span class="p">(</span><span class="o">++</span><span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">n</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-469"></a>        <span class="nx">subcoordinates</span> <span class="o">=</span> <span class="nx">coordinates</span><span class="cp">[</span><span class="nx">i</span><span class="cp">]</span><span class="p">;</span>
<a name="cl-470"></a>        <span class="nx">j</span> <span class="o">=</span> <span class="o">-</span><span class="mi">1</span><span class="p">;</span>
<a name="cl-471"></a>        <span class="nx">m</span> <span class="o">=</span> <span class="nx">subcoordinates</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span>
<a name="cl-472"></a>        <span class="k">while</span> <span class="p">(</span><span class="o">++</span><span class="nx">j</span> <span class="o">&lt;</span> <span class="nx">m</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-473"></a>          <span class="nx">subsubcoordinates</span> <span class="o">=</span> <span class="nx">subcoordinates</span><span class="cp">[</span><span class="nx">j</span><span class="cp">]</span><span class="p">;</span>
<a name="cl-474"></a>          <span class="nx">k</span> <span class="o">=</span> <span class="o">-</span><span class="mi">1</span><span class="p">;</span>
<a name="cl-475"></a>          <span class="k">if</span> <span class="p">((</span><span class="nx">p</span> <span class="o">=</span> <span class="nx">subsubcoordinates</span><span class="p">.</span><span class="nx">length</span> <span class="o">-</span> <span class="mi">1</span><span class="p">)</span> <span class="o">&gt;</span> <span class="mi">0</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-476"></a>            <span class="nx">path</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="s2">&quot;M&quot;</span><span class="p">);</span>
<a name="cl-477"></a>            <span class="k">while</span> <span class="p">(</span><span class="o">++</span><span class="nx">k</span> <span class="o">&lt;</span> <span class="nx">p</span><span class="p">)</span> <span class="nx">path</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">project</span><span class="p">(</span><span class="nx">subsubcoordinates</span><span class="cp">[</span><span class="nx">k</span><span class="cp">]</span><span class="p">),</span> <span class="s2">&quot;L&quot;</span><span class="p">);</span>
<a name="cl-478"></a>            <span class="nx">path</span><span class="cp">[</span><span class="nx">path.length</span> <span class="o">-</span> <span class="mi">1</span><span class="cp">]</span> <span class="o">=</span> <span class="s2">&quot;Z&quot;</span><span class="p">;</span>
<a name="cl-479"></a>          <span class="p">}</span>
<a name="cl-480"></a>        <span class="p">}</span>
<a name="cl-481"></a>      <span class="p">}</span>
<a name="cl-482"></a>      <span class="k">return</span> <span class="nx">path</span><span class="p">.</span><span class="nx">join</span><span class="p">(</span><span class="s2">&quot;&quot;</span><span class="p">);</span>
<a name="cl-483"></a>    <span class="p">},</span>
<a name="cl-484"></a>
<a name="cl-485"></a>    <span class="nx">GeometryCollection</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-486"></a>      <span class="kd">var</span> <span class="nx">path</span> <span class="o">=</span> <span class="cp">[]</span><span class="p">,</span>
<a name="cl-487"></a>          <span class="nx">geometries</span> <span class="o">=</span> <span class="nx">o</span><span class="p">.</span><span class="nx">geometries</span><span class="p">,</span>
<a name="cl-488"></a>          <span class="nx">i</span> <span class="o">=</span> <span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="c1">// geometries index</span>
<a name="cl-489"></a>          <span class="nx">n</span> <span class="o">=</span> <span class="nx">geometries</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span>
<a name="cl-490"></a>      <span class="k">while</span> <span class="p">(</span><span class="o">++</span><span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">n</span><span class="p">)</span> <span class="nx">path</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">pathType</span><span class="p">(</span><span class="nx">geometries</span><span class="cp">[</span><span class="nx">i</span><span class="cp">]</span><span class="p">));</span>
<a name="cl-491"></a>      <span class="k">return</span> <span class="nx">path</span><span class="p">.</span><span class="nx">join</span><span class="p">(</span><span class="s2">&quot;&quot;</span><span class="p">);</span>
<a name="cl-492"></a>    <span class="p">}</span>
<a name="cl-493"></a>
<a name="cl-494"></a>  <span class="p">});</span>
<a name="cl-495"></a>
<a name="cl-496"></a>  <span class="kd">var</span> <span class="nx">areaType</span> <span class="o">=</span> <span class="nx">path</span><span class="p">.</span><span class="nx">area</span> <span class="o">=</span> <span class="nx">d3_geo_type</span><span class="p">({</span>
<a name="cl-497"></a>
<a name="cl-498"></a>    <span class="nx">FeatureCollection</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-499"></a>      <span class="kd">var</span> <span class="nx">area</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span>
<a name="cl-500"></a>          <span class="nx">features</span> <span class="o">=</span> <span class="nx">o</span><span class="p">.</span><span class="nx">features</span><span class="p">,</span>
<a name="cl-501"></a>          <span class="nx">i</span> <span class="o">=</span> <span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="c1">// features.index</span>
<a name="cl-502"></a>          <span class="nx">n</span> <span class="o">=</span> <span class="nx">features</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span>
<a name="cl-503"></a>      <span class="k">while</span> <span class="p">(</span><span class="o">++</span><span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">n</span><span class="p">)</span> <span class="nx">area</span> <span class="o">+=</span> <span class="nx">areaType</span><span class="p">(</span><span class="nx">features</span><span class="cp">[</span><span class="nx">i</span><span class="cp">]</span><span class="p">);</span>
<a name="cl-504"></a>      <span class="k">return</span> <span class="nx">area</span><span class="p">;</span>
<a name="cl-505"></a>    <span class="p">},</span>
<a name="cl-506"></a>
<a name="cl-507"></a>    <span class="nx">Feature</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-508"></a>      <span class="k">return</span> <span class="nx">areaType</span><span class="p">(</span><span class="nx">o</span><span class="p">.</span><span class="nx">geometry</span><span class="p">);</span>
<a name="cl-509"></a>    <span class="p">},</span>
<a name="cl-510"></a>
<a name="cl-511"></a>    <span class="nx">Polygon</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-512"></a>      <span class="k">return</span> <span class="nx">polygonArea</span><span class="p">(</span><span class="nx">o</span><span class="p">.</span><span class="nx">coordinates</span><span class="p">);</span>
<a name="cl-513"></a>    <span class="p">},</span>
<a name="cl-514"></a>
<a name="cl-515"></a>    <span class="nx">MultiPolygon</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-516"></a>      <span class="kd">var</span> <span class="nx">sum</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span>
<a name="cl-517"></a>          <span class="nx">coordinates</span> <span class="o">=</span> <span class="nx">o</span><span class="p">.</span><span class="nx">coordinates</span><span class="p">,</span>
<a name="cl-518"></a>          <span class="nx">i</span> <span class="o">=</span> <span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="c1">// coordinates index</span>
<a name="cl-519"></a>          <span class="nx">n</span> <span class="o">=</span> <span class="nx">coordinates</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span>
<a name="cl-520"></a>      <span class="k">while</span> <span class="p">(</span><span class="o">++</span><span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">n</span><span class="p">)</span> <span class="nx">sum</span> <span class="o">+=</span> <span class="nx">polygonArea</span><span class="p">(</span><span class="nx">coordinates</span><span class="cp">[</span><span class="nx">i</span><span class="cp">]</span><span class="p">);</span>
<a name="cl-521"></a>      <span class="k">return</span> <span class="nx">sum</span><span class="p">;</span>
<a name="cl-522"></a>    <span class="p">},</span>
<a name="cl-523"></a>
<a name="cl-524"></a>    <span class="nx">GeometryCollection</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-525"></a>      <span class="kd">var</span> <span class="nx">sum</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span>
<a name="cl-526"></a>          <span class="nx">geometries</span> <span class="o">=</span> <span class="nx">o</span><span class="p">.</span><span class="nx">geometries</span><span class="p">,</span>
<a name="cl-527"></a>          <span class="nx">i</span> <span class="o">=</span> <span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="c1">// geometries index</span>
<a name="cl-528"></a>          <span class="nx">n</span> <span class="o">=</span> <span class="nx">geometries</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span>
<a name="cl-529"></a>      <span class="k">while</span> <span class="p">(</span><span class="o">++</span><span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">n</span><span class="p">)</span> <span class="nx">sum</span> <span class="o">+=</span> <span class="nx">areaType</span><span class="p">(</span><span class="nx">geometries</span><span class="cp">[</span><span class="nx">i</span><span class="cp">]</span><span class="p">);</span>
<a name="cl-530"></a>      <span class="k">return</span> <span class="nx">sum</span><span class="p">;</span>
<a name="cl-531"></a>    <span class="p">}</span>
<a name="cl-532"></a>
<a name="cl-533"></a>  <span class="p">},</span> <span class="mi">0</span><span class="p">);</span>
<a name="cl-534"></a>
<a name="cl-535"></a>  <span class="kd">function</span> <span class="nx">polygonArea</span><span class="p">(</span><span class="nx">coordinates</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-536"></a>    <span class="kd">var</span> <span class="nx">sum</span> <span class="o">=</span> <span class="nx">area</span><span class="p">(</span><span class="nx">coordinates</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">),</span> <span class="c1">// exterior ring</span>
<a name="cl-537"></a>        <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span> <span class="c1">// coordinates.index</span>
<a name="cl-538"></a>        <span class="nx">n</span> <span class="o">=</span> <span class="nx">coordinates</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span>
<a name="cl-539"></a>    <span class="k">while</span> <span class="p">(</span><span class="o">++</span><span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">n</span><span class="p">)</span> <span class="nx">sum</span> <span class="o">-=</span> <span class="nx">area</span><span class="p">(</span><span class="nx">coordinates</span><span class="cp">[</span><span class="nx">i</span><span class="cp">]</span><span class="p">);</span> <span class="c1">// holes</span>
<a name="cl-540"></a>    <span class="k">return</span> <span class="nx">sum</span><span class="p">;</span>
<a name="cl-541"></a>  <span class="p">}</span>
<a name="cl-542"></a>
<a name="cl-543"></a>  <span class="kd">function</span> <span class="nx">polygonCentroid</span><span class="p">(</span><span class="nx">coordinates</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-544"></a>    <span class="kd">var</span> <span class="nx">polygon</span> <span class="o">=</span> <span class="nx">d3</span><span class="p">.</span><span class="nx">geom</span><span class="p">.</span><span class="nx">polygon</span><span class="p">(</span><span class="nx">coordinates</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">.</span><span class="nx">map</span><span class="p">(</span><span class="nx">projection</span><span class="p">)),</span> <span class="c1">// exterior ring</span>
<a name="cl-545"></a>        <span class="nx">area</span> <span class="o">=</span> <span class="nx">polygon</span><span class="p">.</span><span class="nx">area</span><span class="p">(),</span>
<a name="cl-546"></a>        <span class="nx">centroid</span> <span class="o">=</span> <span class="nx">polygon</span><span class="p">.</span><span class="nx">centroid</span><span class="p">(</span><span class="nx">area</span> <span class="o">&lt;</span> <span class="mi">0</span> <span class="o">?</span> <span class="p">(</span><span class="nx">area</span> <span class="o">*=</span> <span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="mi">1</span><span class="p">)</span> <span class="o">:</span> <span class="o">-</span><span class="mi">1</span><span class="p">),</span>
<a name="cl-547"></a>        <span class="nx">x</span> <span class="o">=</span> <span class="nx">centroid</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">,</span>
<a name="cl-548"></a>        <span class="nx">y</span> <span class="o">=</span> <span class="nx">centroid</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span><span class="p">,</span>
<a name="cl-549"></a>        <span class="nx">z</span> <span class="o">=</span> <span class="nx">area</span><span class="p">,</span>
<a name="cl-550"></a>        <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span> <span class="c1">// coordinates index</span>
<a name="cl-551"></a>        <span class="nx">n</span> <span class="o">=</span> <span class="nx">coordinates</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span>
<a name="cl-552"></a>    <span class="k">while</span> <span class="p">(</span><span class="o">++</span><span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">n</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-553"></a>      <span class="nx">polygon</span> <span class="o">=</span> <span class="nx">d3</span><span class="p">.</span><span class="nx">geom</span><span class="p">.</span><span class="nx">polygon</span><span class="p">(</span><span class="nx">coordinates</span><span class="cp">[</span><span class="nx">i</span><span class="cp">]</span><span class="p">.</span><span class="nx">map</span><span class="p">(</span><span class="nx">projection</span><span class="p">));</span> <span class="c1">// holes</span>
<a name="cl-554"></a>      <span class="nx">area</span> <span class="o">=</span> <span class="nx">polygon</span><span class="p">.</span><span class="nx">area</span><span class="p">();</span>
<a name="cl-555"></a>      <span class="nx">centroid</span> <span class="o">=</span> <span class="nx">polygon</span><span class="p">.</span><span class="nx">centroid</span><span class="p">(</span><span class="nx">area</span> <span class="o">&lt;</span> <span class="mi">0</span> <span class="o">?</span> <span class="p">(</span><span class="nx">area</span> <span class="o">*=</span> <span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="mi">1</span><span class="p">)</span> <span class="o">:</span> <span class="o">-</span><span class="mi">1</span><span class="p">);</span>
<a name="cl-556"></a>      <span class="nx">x</span> <span class="o">-=</span> <span class="nx">centroid</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">;</span>
<a name="cl-557"></a>      <span class="nx">y</span> <span class="o">-=</span> <span class="nx">centroid</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span><span class="p">;</span>
<a name="cl-558"></a>      <span class="nx">z</span> <span class="o">-=</span> <span class="nx">area</span><span class="p">;</span>
<a name="cl-559"></a>    <span class="p">}</span>
<a name="cl-560"></a>    <span class="k">return</span> <span class="cp">[</span><span class="nx">x</span><span class="p">,</span> <span class="nx">y</span><span class="p">,</span> <span class="mi">6</span> <span class="o">*</span> <span class="nx">z</span><span class="cp">]</span><span class="p">;</span> <span class="c1">// weighted centroid</span>
<a name="cl-561"></a>  <span class="p">}</span>
<a name="cl-562"></a>
<a name="cl-563"></a>  <span class="kd">var</span> <span class="nx">centroidType</span> <span class="o">=</span> <span class="nx">path</span><span class="p">.</span><span class="nx">centroid</span> <span class="o">=</span> <span class="nx">d3_geo_type</span><span class="p">({</span>
<a name="cl-564"></a>
<a name="cl-565"></a>    <span class="c1">// TODO FeatureCollection</span>
<a name="cl-566"></a>    <span class="c1">// TODO Point</span>
<a name="cl-567"></a>    <span class="c1">// TODO MultiPoint</span>
<a name="cl-568"></a>    <span class="c1">// TODO LineString</span>
<a name="cl-569"></a>    <span class="c1">// TODO MultiLineString</span>
<a name="cl-570"></a>    <span class="c1">// TODO GeometryCollection</span>
<a name="cl-571"></a>
<a name="cl-572"></a>    <span class="nx">Feature</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-573"></a>      <span class="k">return</span> <span class="nx">centroidType</span><span class="p">(</span><span class="nx">o</span><span class="p">.</span><span class="nx">geometry</span><span class="p">);</span>
<a name="cl-574"></a>    <span class="p">},</span>
<a name="cl-575"></a>
<a name="cl-576"></a>    <span class="nx">Polygon</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-577"></a>      <span class="kd">var</span> <span class="nx">centroid</span> <span class="o">=</span> <span class="nx">polygonCentroid</span><span class="p">(</span><span class="nx">o</span><span class="p">.</span><span class="nx">coordinates</span><span class="p">);</span>
<a name="cl-578"></a>      <span class="k">return</span> <span class="cp">[</span><span class="nx">centroid</span><span class="err">[</span><span class="mi">0</span><span class="cp">]</span> <span class="sr">/ centroid</span><span class="cp">[</span><span class="mi">2</span><span class="cp">]</span><span class="sr">, centroid</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span><span class="sr"> /</span> <span class="nx">centroid</span><span class="cp">[</span><span class="mi">2</span><span class="cp">]</span><span class="p">];</span>
<a name="cl-579"></a>    <span class="p">},</span>
<a name="cl-580"></a>
<a name="cl-581"></a>    <span class="nx">MultiPolygon</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-582"></a>      <span class="kd">var</span> <span class="nx">area</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span>
<a name="cl-583"></a>          <span class="nx">coordinates</span> <span class="o">=</span> <span class="nx">o</span><span class="p">.</span><span class="nx">coordinates</span><span class="p">,</span>
<a name="cl-584"></a>          <span class="nx">centroid</span><span class="p">,</span>
<a name="cl-585"></a>          <span class="nx">x</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span>
<a name="cl-586"></a>          <span class="nx">y</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span>
<a name="cl-587"></a>          <span class="nx">z</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span>
<a name="cl-588"></a>          <span class="nx">i</span> <span class="o">=</span> <span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="c1">// coordinates index</span>
<a name="cl-589"></a>          <span class="nx">n</span> <span class="o">=</span> <span class="nx">coordinates</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span>
<a name="cl-590"></a>      <span class="k">while</span> <span class="p">(</span><span class="o">++</span><span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">n</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-591"></a>        <span class="nx">centroid</span> <span class="o">=</span> <span class="nx">polygonCentroid</span><span class="p">(</span><span class="nx">coordinates</span><span class="cp">[</span><span class="nx">i</span><span class="cp">]</span><span class="p">);</span>
<a name="cl-592"></a>        <span class="nx">x</span> <span class="o">+=</span> <span class="nx">centroid</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">;</span>
<a name="cl-593"></a>        <span class="nx">y</span> <span class="o">+=</span> <span class="nx">centroid</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span><span class="p">;</span>
<a name="cl-594"></a>        <span class="nx">z</span> <span class="o">+=</span> <span class="nx">centroid</span><span class="cp">[</span><span class="mi">2</span><span class="cp">]</span><span class="p">;</span>
<a name="cl-595"></a>      <span class="p">}</span>
<a name="cl-596"></a>      <span class="k">return</span> <span class="cp">[</span><span class="nx">x</span> <span class="o">/</span> <span class="nx">z</span><span class="p">,</span> <span class="nx">y</span> <span class="o">/</span> <span class="nx">z</span><span class="cp">]</span><span class="p">;</span>
<a name="cl-597"></a>    <span class="p">}</span>
<a name="cl-598"></a>
<a name="cl-599"></a>  <span class="p">});</span>
<a name="cl-600"></a>
<a name="cl-601"></a>  <span class="kd">function</span> <span class="nx">area</span><span class="p">(</span><span class="nx">coordinates</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-602"></a>    <span class="k">return</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">abs</span><span class="p">(</span><span class="nx">d3</span><span class="p">.</span><span class="nx">geom</span><span class="p">.</span><span class="nx">polygon</span><span class="p">(</span><span class="nx">coordinates</span><span class="p">.</span><span class="nx">map</span><span class="p">(</span><span class="nx">projection</span><span class="p">)).</span><span class="nx">area</span><span class="p">());</span>
<a name="cl-603"></a>  <span class="p">}</span>
<a name="cl-604"></a>
<a name="cl-605"></a>  <span class="nx">path</span><span class="p">.</span><span class="nx">projection</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-606"></a>    <span class="nx">projection</span> <span class="o">=</span> <span class="nx">x</span><span class="p">;</span>
<a name="cl-607"></a>    <span class="k">return</span> <span class="nx">path</span><span class="p">;</span>
<a name="cl-608"></a>  <span class="p">};</span>
<a name="cl-609"></a>
<a name="cl-610"></a>  <span class="nx">path</span><span class="p">.</span><span class="nx">pointRadius</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-611"></a>    <span class="k">if</span> <span class="p">(</span><span class="k">typeof</span> <span class="nx">x</span> <span class="o">===</span> <span class="s2">&quot;function&quot;</span><span class="p">)</span> <span class="nx">pointRadius</span> <span class="o">=</span> <span class="nx">x</span><span class="p">;</span>
<a name="cl-612"></a>    <span class="k">else</span> <span class="p">{</span>
<a name="cl-613"></a>      <span class="nx">pointRadius</span> <span class="o">=</span> <span class="o">+</span><span class="nx">x</span><span class="p">;</span>
<a name="cl-614"></a>      <span class="nx">pointCircle</span> <span class="o">=</span> <span class="nx">d3_path_circle</span><span class="p">(</span><span class="nx">pointRadius</span><span class="p">);</span>
<a name="cl-615"></a>    <span class="p">}</span>
<a name="cl-616"></a>    <span class="k">return</span> <span class="nx">path</span><span class="p">;</span>
<a name="cl-617"></a>  <span class="p">};</span>
<a name="cl-618"></a>
<a name="cl-619"></a>  <span class="k">return</span> <span class="nx">path</span><span class="p">;</span>
<a name="cl-620"></a><span class="p">};</span>
<a name="cl-621"></a>
<a name="cl-622"></a><span class="kd">function</span> <span class="nx">d3_path_circle</span><span class="p">(</span><span class="nx">radius</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-623"></a>  <span class="k">return</span> <span class="s2">&quot;m0,&quot;</span> <span class="o">+</span> <span class="nx">radius</span>
<a name="cl-624"></a>      <span class="o">+</span> <span class="s2">&quot;a&quot;</span> <span class="o">+</span> <span class="nx">radius</span> <span class="o">+</span> <span class="s2">&quot;,&quot;</span> <span class="o">+</span> <span class="nx">radius</span> <span class="o">+</span> <span class="s2">&quot; 0 1,1 0,&quot;</span> <span class="o">+</span> <span class="p">(</span><span class="o">-</span><span class="mi">2</span> <span class="o">*</span> <span class="nx">radius</span><span class="p">)</span>
<a name="cl-625"></a>      <span class="o">+</span> <span class="s2">&quot;a&quot;</span> <span class="o">+</span> <span class="nx">radius</span> <span class="o">+</span> <span class="s2">&quot;,&quot;</span> <span class="o">+</span> <span class="nx">radius</span> <span class="o">+</span> <span class="s2">&quot; 0 1,1 0,&quot;</span> <span class="o">+</span> <span class="p">(</span><span class="o">+</span><span class="mi">2</span> <span class="o">*</span> <span class="nx">radius</span><span class="p">)</span>
<a name="cl-626"></a>      <span class="o">+</span> <span class="s2">&quot;z&quot;</span><span class="p">;</span>
<a name="cl-627"></a><span class="p">}</span>
<a name="cl-628"></a><span class="cm">/**</span>
<a name="cl-629"></a><span class="cm"> * Given a GeoJSON object, returns the corresponding bounding box. The bounding</span>
<a name="cl-630"></a><span class="cm"> * box is represented by a two-dimensional array: </span><span class="cp">[</span><span class="err">[</span><span class="nx">left</span><span class="p">,</span> <span class="nx">bottom</span><span class="cp">]</span><span class="cm">, </span><span class="cp">[</span><span class="nx">right</span><span class="p">,</span>
<a name="cl-631"></a> <span class="o">*</span> <span class="nx">top</span><span class="cp">]</span><span class="cm">], where left is the minimum longitude, bottom is the minimum latitude,</span>
<a name="cl-632"></a><span class="cm"> * right is maximum longitude, and top is the maximum latitude.</span>
<a name="cl-633"></a><span class="cm"> */</span>
<a name="cl-634"></a><span class="nx">d3</span><span class="p">.</span><span class="nx">geo</span><span class="p">.</span><span class="nx">bounds</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">feature</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-635"></a>  <span class="kd">var</span> <span class="nx">left</span> <span class="o">=</span> <span class="kc">Infinity</span><span class="p">,</span>
<a name="cl-636"></a>      <span class="nx">bottom</span> <span class="o">=</span> <span class="kc">Infinity</span><span class="p">,</span>
<a name="cl-637"></a>      <span class="nx">right</span> <span class="o">=</span> <span class="o">-</span><span class="kc">Infinity</span><span class="p">,</span>
<a name="cl-638"></a>      <span class="nx">top</span> <span class="o">=</span> <span class="o">-</span><span class="kc">Infinity</span><span class="p">;</span>
<a name="cl-639"></a>  <span class="nx">d3_geo_bounds</span><span class="p">(</span><span class="nx">feature</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="nx">y</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-640"></a>    <span class="k">if</span> <span class="p">(</span><span class="nx">x</span> <span class="o">&lt;</span> <span class="nx">left</span><span class="p">)</span> <span class="nx">left</span> <span class="o">=</span> <span class="nx">x</span><span class="p">;</span>
<a name="cl-641"></a>    <span class="k">if</span> <span class="p">(</span><span class="nx">x</span> <span class="o">&gt;</span> <span class="nx">right</span><span class="p">)</span> <span class="nx">right</span> <span class="o">=</span> <span class="nx">x</span><span class="p">;</span>
<a name="cl-642"></a>    <span class="k">if</span> <span class="p">(</span><span class="nx">y</span> <span class="o">&lt;</span> <span class="nx">bottom</span><span class="p">)</span> <span class="nx">bottom</span> <span class="o">=</span> <span class="nx">y</span><span class="p">;</span>
<a name="cl-643"></a>    <span class="k">if</span> <span class="p">(</span><span class="nx">y</span> <span class="o">&gt;</span> <span class="nx">top</span><span class="p">)</span> <span class="nx">top</span> <span class="o">=</span> <span class="nx">y</span><span class="p">;</span>
<a name="cl-644"></a>  <span class="p">});</span>
<a name="cl-645"></a>  <span class="k">return</span> <span class="cp">[</span><span class="err">[</span><span class="nx">left</span><span class="p">,</span> <span class="nx">bottom</span><span class="cp">]</span><span class="p">,</span> <span class="cp">[</span><span class="nx">right</span><span class="p">,</span> <span class="nx">top</span><span class="cp">]</span><span class="p">];</span>
<a name="cl-646"></a><span class="p">};</span>
<a name="cl-647"></a>
<a name="cl-648"></a><span class="kd">function</span> <span class="nx">d3_geo_bounds</span><span class="p">(</span><span class="nx">o</span><span class="p">,</span> <span class="nx">f</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-649"></a>  <span class="k">if</span> <span class="p">(</span><span class="nx">o</span><span class="p">.</span><span class="nx">type</span> <span class="k">in</span> <span class="nx">d3_geo_boundsTypes</span><span class="p">)</span> <span class="nx">d3_geo_boundsTypes</span><span class="cp">[</span><span class="nx">o.type</span><span class="cp">]</span><span class="p">(</span><span class="nx">o</span><span class="p">,</span> <span class="nx">f</span><span class="p">);</span>
<a name="cl-650"></a><span class="p">}</span>
<a name="cl-651"></a>
<a name="cl-652"></a><span class="kd">var</span> <span class="nx">d3_geo_boundsTypes</span> <span class="o">=</span> <span class="p">{</span>
<a name="cl-653"></a>  <span class="nx">Feature</span><span class="o">:</span> <span class="nx">d3_geo_boundsFeature</span><span class="p">,</span>
<a name="cl-654"></a>  <span class="nx">FeatureCollection</span><span class="o">:</span> <span class="nx">d3_geo_boundsFeatureCollection</span><span class="p">,</span>
<a name="cl-655"></a>  <span class="nx">LineString</span><span class="o">:</span> <span class="nx">d3_geo_boundsLineString</span><span class="p">,</span>
<a name="cl-656"></a>  <span class="nx">MultiLineString</span><span class="o">:</span> <span class="nx">d3_geo_boundsMultiLineString</span><span class="p">,</span>
<a name="cl-657"></a>  <span class="nx">MultiPoint</span><span class="o">:</span> <span class="nx">d3_geo_boundsLineString</span><span class="p">,</span>
<a name="cl-658"></a>  <span class="nx">MultiPolygon</span><span class="o">:</span> <span class="nx">d3_geo_boundsMultiPolygon</span><span class="p">,</span>
<a name="cl-659"></a>  <span class="nx">Point</span><span class="o">:</span> <span class="nx">d3_geo_boundsPoint</span><span class="p">,</span>
<a name="cl-660"></a>  <span class="nx">Polygon</span><span class="o">:</span> <span class="nx">d3_geo_boundsPolygon</span>
<a name="cl-661"></a><span class="p">};</span>
<a name="cl-662"></a>
<a name="cl-663"></a><span class="kd">function</span> <span class="nx">d3_geo_boundsFeature</span><span class="p">(</span><span class="nx">o</span><span class="p">,</span> <span class="nx">f</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-664"></a>  <span class="nx">d3_geo_bounds</span><span class="p">(</span><span class="nx">o</span><span class="p">.</span><span class="nx">geometry</span><span class="p">,</span> <span class="nx">f</span><span class="p">);</span>
<a name="cl-665"></a><span class="p">}</span>
<a name="cl-666"></a>
<a name="cl-667"></a><span class="kd">function</span> <span class="nx">d3_geo_boundsFeatureCollection</span><span class="p">(</span><span class="nx">o</span><span class="p">,</span> <span class="nx">f</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-668"></a>  <span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">a</span> <span class="o">=</span> <span class="nx">o</span><span class="p">.</span><span class="nx">features</span><span class="p">,</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span> <span class="nx">n</span> <span class="o">=</span> <span class="nx">a</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">n</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-669"></a>    <span class="nx">d3_geo_bounds</span><span class="p">(</span><span class="nx">a</span><span class="cp">[</span><span class="nx">i</span><span class="cp">]</span><span class="p">.</span><span class="nx">geometry</span><span class="p">,</span> <span class="nx">f</span><span class="p">);</span>
<a name="cl-670"></a>  <span class="p">}</span>
<a name="cl-671"></a><span class="p">}</span>
<a name="cl-672"></a>
<a name="cl-673"></a><span class="kd">function</span> <span class="nx">d3_geo_boundsLineString</span><span class="p">(</span><span class="nx">o</span><span class="p">,</span> <span class="nx">f</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-674"></a>  <span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">a</span> <span class="o">=</span> <span class="nx">o</span><span class="p">.</span><span class="nx">coordinates</span><span class="p">,</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span> <span class="nx">n</span> <span class="o">=</span> <span class="nx">a</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">n</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-675"></a>    <span class="nx">f</span><span class="p">.</span><span class="nx">apply</span><span class="p">(</span><span class="kc">null</span><span class="p">,</span> <span class="nx">a</span><span class="cp">[</span><span class="nx">i</span><span class="cp">]</span><span class="p">);</span>
<a name="cl-676"></a>  <span class="p">}</span>
<a name="cl-677"></a><span class="p">}</span>
<a name="cl-678"></a>
<a name="cl-679"></a><span class="kd">function</span> <span class="nx">d3_geo_boundsMultiLineString</span><span class="p">(</span><span class="nx">o</span><span class="p">,</span> <span class="nx">f</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-680"></a>  <span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">a</span> <span class="o">=</span> <span class="nx">o</span><span class="p">.</span><span class="nx">coordinates</span><span class="p">,</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span> <span class="nx">n</span> <span class="o">=</span> <span class="nx">a</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">n</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-681"></a>    <span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">b</span> <span class="o">=</span> <span class="nx">a</span><span class="cp">[</span><span class="nx">i</span><span class="cp">]</span><span class="p">,</span> <span class="nx">j</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span> <span class="nx">m</span> <span class="o">=</span> <span class="nx">b</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">j</span> <span class="o">&lt;</span> <span class="nx">m</span><span class="p">;</span> <span class="nx">j</span><span class="o">++</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-682"></a>      <span class="nx">f</span><span class="p">.</span><span class="nx">apply</span><span class="p">(</span><span class="kc">null</span><span class="p">,</span> <span class="nx">b</span><span class="cp">[</span><span class="nx">j</span><span class="cp">]</span><span class="p">);</span>
<a name="cl-683"></a>    <span class="p">}</span>
<a name="cl-684"></a>  <span class="p">}</span>
<a name="cl-685"></a><span class="p">}</span>
<a name="cl-686"></a>
<a name="cl-687"></a><span class="kd">function</span> <span class="nx">d3_geo_boundsMultiPolygon</span><span class="p">(</span><span class="nx">o</span><span class="p">,</span> <span class="nx">f</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-688"></a>  <span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">a</span> <span class="o">=</span> <span class="nx">o</span><span class="p">.</span><span class="nx">coordinates</span><span class="p">,</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span> <span class="nx">n</span> <span class="o">=</span> <span class="nx">a</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">n</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-689"></a>    <span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">b</span> <span class="o">=</span> <span class="nx">a</span><span class="cp">[</span><span class="nx">i</span><span class="cp">][</span><span class="mi">0</span><span class="cp">]</span><span class="p">,</span> <span class="nx">j</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span> <span class="nx">m</span> <span class="o">=</span> <span class="nx">b</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">j</span> <span class="o">&lt;</span> <span class="nx">m</span><span class="p">;</span> <span class="nx">j</span><span class="o">++</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-690"></a>      <span class="nx">f</span><span class="p">.</span><span class="nx">apply</span><span class="p">(</span><span class="kc">null</span><span class="p">,</span> <span class="nx">b</span><span class="cp">[</span><span class="nx">j</span><span class="cp">]</span><span class="p">);</span>
<a name="cl-691"></a>    <span class="p">}</span>
<a name="cl-692"></a>  <span class="p">}</span>
<a name="cl-693"></a><span class="p">}</span>
<a name="cl-694"></a>
<a name="cl-695"></a><span class="kd">function</span> <span class="nx">d3_geo_boundsPoint</span><span class="p">(</span><span class="nx">o</span><span class="p">,</span> <span class="nx">f</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-696"></a>  <span class="nx">f</span><span class="p">.</span><span class="nx">apply</span><span class="p">(</span><span class="kc">null</span><span class="p">,</span> <span class="nx">o</span><span class="p">.</span><span class="nx">coordinates</span><span class="p">);</span>
<a name="cl-697"></a><span class="p">}</span>
<a name="cl-698"></a>
<a name="cl-699"></a><span class="kd">function</span> <span class="nx">d3_geo_boundsPolygon</span><span class="p">(</span><span class="nx">o</span><span class="p">,</span> <span class="nx">f</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-700"></a>  <span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">a</span> <span class="o">=</span> <span class="nx">o</span><span class="p">.</span><span class="nx">coordinates</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">,</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span> <span class="nx">n</span> <span class="o">=</span> <span class="nx">a</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">n</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-701"></a>    <span class="nx">f</span><span class="p">.</span><span class="nx">apply</span><span class="p">(</span><span class="kc">null</span><span class="p">,</span> <span class="nx">a</span><span class="cp">[</span><span class="nx">i</span><span class="cp">]</span><span class="p">);</span>
<a name="cl-702"></a>  <span class="p">}</span>
<a name="cl-703"></a><span class="p">}</span>
<a name="cl-704"></a><span class="c1">// TODO breakAtDateLine?</span>
<a name="cl-705"></a>
<a name="cl-706"></a><span class="nx">d3</span><span class="p">.</span><span class="nx">geo</span><span class="p">.</span><span class="nx">circle</span> <span class="o">=</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
<a name="cl-707"></a>  <span class="kd">var</span> <span class="nx">origin</span> <span class="o">=</span> <span class="cp">[</span><span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="cp">]</span><span class="p">,</span>
<a name="cl-708"></a>      <span class="nx">degrees</span> <span class="o">=</span> <span class="mi">90</span> <span class="o">-</span> <span class="mi">1</span><span class="nx">e</span><span class="o">-</span><span class="mi">2</span><span class="p">,</span>
<a name="cl-709"></a>      <span class="nx">radians</span> <span class="o">=</span> <span class="nx">degrees</span> <span class="o">*</span> <span class="nx">d3_geo_radians</span><span class="p">,</span>
<a name="cl-710"></a>      <span class="nx">arc</span> <span class="o">=</span> <span class="nx">d3</span><span class="p">.</span><span class="nx">geo</span><span class="p">.</span><span class="nx">greatArc</span><span class="p">().</span><span class="nx">target</span><span class="p">(</span><span class="nb">Object</span><span class="p">);</span>
<a name="cl-711"></a>
<a name="cl-712"></a>  <span class="kd">function</span> <span class="nx">circle</span><span class="p">()</span> <span class="p">{</span>
<a name="cl-713"></a>    <span class="c1">// TODO render a circle as a Polygon</span>
<a name="cl-714"></a>  <span class="p">}</span>
<a name="cl-715"></a>
<a name="cl-716"></a>  <span class="kd">function</span> <span class="nx">visible</span><span class="p">(</span><span class="nx">point</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-717"></a>    <span class="k">return</span> <span class="nx">arc</span><span class="p">.</span><span class="nx">distance</span><span class="p">(</span><span class="nx">point</span><span class="p">)</span> <span class="o">&lt;</span> <span class="nx">radians</span><span class="p">;</span>
<a name="cl-718"></a>  <span class="p">}</span>
<a name="cl-719"></a>
<a name="cl-720"></a>  <span class="nx">circle</span><span class="p">.</span><span class="nx">clip</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-721"></a>    <span class="nx">arc</span><span class="p">.</span><span class="nx">source</span><span class="p">(</span><span class="k">typeof</span> <span class="nx">origin</span> <span class="o">===</span> <span class="s2">&quot;function&quot;</span> <span class="o">?</span> <span class="nx">origin</span><span class="p">.</span><span class="nx">apply</span><span class="p">(</span><span class="k">this</span><span class="p">,</span> <span class="nx">arguments</span><span class="p">)</span> <span class="o">:</span> <span class="nx">origin</span><span class="p">);</span>
<a name="cl-722"></a>    <span class="k">return</span> <span class="nx">clipType</span><span class="p">(</span><span class="nx">d</span><span class="p">);</span>
<a name="cl-723"></a>  <span class="p">};</span>
<a name="cl-724"></a>
<a name="cl-725"></a>  <span class="kd">var</span> <span class="nx">clipType</span> <span class="o">=</span> <span class="nx">d3_geo_type</span><span class="p">({</span>
<a name="cl-726"></a>
<a name="cl-727"></a>    <span class="nx">FeatureCollection</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-728"></a>      <span class="kd">var</span> <span class="nx">features</span> <span class="o">=</span> <span class="nx">o</span><span class="p">.</span><span class="nx">features</span><span class="p">.</span><span class="nx">map</span><span class="p">(</span><span class="nx">clipType</span><span class="p">).</span><span class="nx">filter</span><span class="p">(</span><span class="nb">Object</span><span class="p">);</span>
<a name="cl-729"></a>      <span class="k">return</span> <span class="nx">features</span> <span class="o">&amp;&amp;</span> <span class="p">(</span><span class="nx">o</span> <span class="o">=</span> <span class="nb">Object</span><span class="p">.</span><span class="nx">create</span><span class="p">(</span><span class="nx">o</span><span class="p">),</span> <span class="nx">o</span><span class="p">.</span><span class="nx">features</span> <span class="o">=</span> <span class="nx">features</span><span class="p">,</span> <span class="nx">o</span><span class="p">);</span>
<a name="cl-730"></a>    <span class="p">},</span>
<a name="cl-731"></a>
<a name="cl-732"></a>    <span class="nx">Feature</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-733"></a>      <span class="kd">var</span> <span class="nx">geometry</span> <span class="o">=</span> <span class="nx">clipType</span><span class="p">(</span><span class="nx">o</span><span class="p">.</span><span class="nx">geometry</span><span class="p">);</span>
<a name="cl-734"></a>      <span class="k">return</span> <span class="nx">geometry</span> <span class="o">&amp;&amp;</span> <span class="p">(</span><span class="nx">o</span> <span class="o">=</span> <span class="nb">Object</span><span class="p">.</span><span class="nx">create</span><span class="p">(</span><span class="nx">o</span><span class="p">),</span> <span class="nx">o</span><span class="p">.</span><span class="nx">geometry</span> <span class="o">=</span> <span class="nx">geometry</span><span class="p">,</span> <span class="nx">o</span><span class="p">);</span>
<a name="cl-735"></a>    <span class="p">},</span>
<a name="cl-736"></a>
<a name="cl-737"></a>    <span class="nx">Point</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-738"></a>      <span class="k">return</span> <span class="nx">visible</span><span class="p">(</span><span class="nx">o</span><span class="p">.</span><span class="nx">coordinates</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="nx">o</span><span class="p">;</span>
<a name="cl-739"></a>    <span class="p">},</span>
<a name="cl-740"></a>
<a name="cl-741"></a>    <span class="nx">MultiPoint</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-742"></a>      <span class="kd">var</span> <span class="nx">coordinates</span> <span class="o">=</span> <span class="nx">o</span><span class="p">.</span><span class="nx">coordinates</span><span class="p">.</span><span class="nx">filter</span><span class="p">(</span><span class="nx">visible</span><span class="p">);</span>
<a name="cl-743"></a>      <span class="k">return</span> <span class="nx">coordinates</span><span class="p">.</span><span class="nx">length</span> <span class="o">&amp;&amp;</span> <span class="p">{</span>
<a name="cl-744"></a>        <span class="nx">type</span><span class="o">:</span> <span class="nx">o</span><span class="p">.</span><span class="nx">type</span><span class="p">,</span>
<a name="cl-745"></a>        <span class="nx">coordinates</span><span class="o">:</span> <span class="nx">coordinates</span>
<a name="cl-746"></a>      <span class="p">};</span>
<a name="cl-747"></a>    <span class="p">},</span>
<a name="cl-748"></a>
<a name="cl-749"></a>    <span class="nx">LineString</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-750"></a>      <span class="kd">var</span> <span class="nx">coordinates</span> <span class="o">=</span> <span class="nx">clip</span><span class="p">(</span><span class="nx">o</span><span class="p">.</span><span class="nx">coordinates</span><span class="p">);</span>
<a name="cl-751"></a>      <span class="k">return</span> <span class="nx">coordinates</span><span class="p">.</span><span class="nx">length</span> <span class="o">&amp;&amp;</span> <span class="p">(</span><span class="nx">o</span> <span class="o">=</span> <span class="nb">Object</span><span class="p">.</span><span class="nx">create</span><span class="p">(</span><span class="nx">o</span><span class="p">),</span> <span class="nx">o</span><span class="p">.</span><span class="nx">coordinates</span> <span class="o">=</span> <span class="nx">coordinates</span><span class="p">,</span> <span class="nx">o</span><span class="p">);</span>
<a name="cl-752"></a>    <span class="p">},</span>
<a name="cl-753"></a>
<a name="cl-754"></a>    <span class="nx">MultiLineString</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-755"></a>      <span class="kd">var</span> <span class="nx">coordinates</span> <span class="o">=</span> <span class="nx">o</span><span class="p">.</span><span class="nx">coordinates</span><span class="p">.</span><span class="nx">map</span><span class="p">(</span><span class="nx">clip</span><span class="p">).</span><span class="nx">filter</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="nx">d</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="p">});</span>
<a name="cl-756"></a>      <span class="k">return</span> <span class="nx">coordinates</span><span class="p">.</span><span class="nx">length</span> <span class="o">&amp;&amp;</span> <span class="p">(</span><span class="nx">o</span> <span class="o">=</span> <span class="nb">Object</span><span class="p">.</span><span class="nx">create</span><span class="p">(</span><span class="nx">o</span><span class="p">),</span> <span class="nx">o</span><span class="p">.</span><span class="nx">coordinates</span> <span class="o">=</span> <span class="nx">coordinates</span><span class="p">,</span> <span class="nx">o</span><span class="p">);</span>
<a name="cl-757"></a>    <span class="p">},</span>
<a name="cl-758"></a>
<a name="cl-759"></a>    <span class="nx">Polygon</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-760"></a>      <span class="kd">var</span> <span class="nx">coordinates</span> <span class="o">=</span> <span class="nx">o</span><span class="p">.</span><span class="nx">coordinates</span><span class="p">.</span><span class="nx">map</span><span class="p">(</span><span class="nx">clip</span><span class="p">);</span>
<a name="cl-761"></a>      <span class="k">return</span> <span class="nx">coordinates</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">.</span><span class="nx">length</span> <span class="o">&amp;&amp;</span> <span class="p">(</span><span class="nx">o</span> <span class="o">=</span> <span class="nb">Object</span><span class="p">.</span><span class="nx">create</span><span class="p">(</span><span class="nx">o</span><span class="p">),</span> <span class="nx">o</span><span class="p">.</span><span class="nx">coordinates</span> <span class="o">=</span> <span class="nx">coordinates</span><span class="p">,</span> <span class="nx">o</span><span class="p">);</span>
<a name="cl-762"></a>    <span class="p">},</span>
<a name="cl-763"></a>
<a name="cl-764"></a>    <span class="nx">MultiPolygon</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-765"></a>      <span class="kd">var</span> <span class="nx">coordinates</span> <span class="o">=</span> <span class="nx">o</span><span class="p">.</span><span class="nx">coordinates</span><span class="p">.</span><span class="nx">map</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="nx">d</span><span class="p">.</span><span class="nx">map</span><span class="p">(</span><span class="nx">clip</span><span class="p">);</span> <span class="p">}).</span><span class="nx">filter</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="nx">d</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="p">});</span>
<a name="cl-766"></a>      <span class="k">return</span> <span class="nx">coordinates</span><span class="p">.</span><span class="nx">length</span> <span class="o">&amp;&amp;</span> <span class="p">(</span><span class="nx">o</span> <span class="o">=</span> <span class="nb">Object</span><span class="p">.</span><span class="nx">create</span><span class="p">(</span><span class="nx">o</span><span class="p">),</span> <span class="nx">o</span><span class="p">.</span><span class="nx">coordinates</span> <span class="o">=</span> <span class="nx">coordinates</span><span class="p">,</span> <span class="nx">o</span><span class="p">);</span>
<a name="cl-767"></a>    <span class="p">},</span>
<a name="cl-768"></a>
<a name="cl-769"></a>    <span class="nx">GeometryCollection</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-770"></a>      <span class="kd">var</span> <span class="nx">geometries</span> <span class="o">=</span> <span class="nx">o</span><span class="p">.</span><span class="nx">geometries</span><span class="p">.</span><span class="nx">map</span><span class="p">(</span><span class="nx">clipType</span><span class="p">).</span><span class="nx">filter</span><span class="p">(</span><span class="nb">Object</span><span class="p">);</span>
<a name="cl-771"></a>      <span class="k">return</span> <span class="nx">geometries</span><span class="p">.</span><span class="nx">length</span> <span class="o">&amp;&amp;</span> <span class="p">(</span><span class="nx">o</span> <span class="o">=</span> <span class="nb">Object</span><span class="p">.</span><span class="nx">create</span><span class="p">(</span><span class="nx">o</span><span class="p">),</span> <span class="nx">o</span><span class="p">.</span><span class="nx">geometries</span> <span class="o">=</span> <span class="nx">geometries</span><span class="p">,</span> <span class="nx">o</span><span class="p">);</span>
<a name="cl-772"></a>    <span class="p">}</span>
<a name="cl-773"></a>
<a name="cl-774"></a>  <span class="p">});</span>
<a name="cl-775"></a>
<a name="cl-776"></a>  <span class="kd">function</span> <span class="nx">clip</span><span class="p">(</span><span class="nx">coordinates</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-777"></a>    <span class="kd">var</span> <span class="nx">i</span> <span class="o">=</span> <span class="o">-</span><span class="mi">1</span><span class="p">,</span>
<a name="cl-778"></a>        <span class="nx">n</span> <span class="o">=</span> <span class="nx">coordinates</span><span class="p">.</span><span class="nx">length</span><span class="p">,</span>
<a name="cl-779"></a>        <span class="nx">clipped</span> <span class="o">=</span> <span class="cp">[]</span><span class="p">,</span>
<a name="cl-780"></a>        <span class="nx">p0</span><span class="p">,</span>
<a name="cl-781"></a>        <span class="nx">p1</span><span class="p">,</span>
<a name="cl-782"></a>        <span class="nx">p2</span><span class="p">,</span>
<a name="cl-783"></a>        <span class="nx">d0</span><span class="p">,</span>
<a name="cl-784"></a>        <span class="nx">d1</span><span class="p">;</span>
<a name="cl-785"></a>
<a name="cl-786"></a>    <span class="k">while</span> <span class="p">(</span><span class="o">++</span><span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">n</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-787"></a>      <span class="nx">d1</span> <span class="o">=</span> <span class="nx">arc</span><span class="p">.</span><span class="nx">distance</span><span class="p">(</span><span class="nx">p2</span> <span class="o">=</span> <span class="nx">coordinates</span><span class="cp">[</span><span class="nx">i</span><span class="cp">]</span><span class="p">);</span>
<a name="cl-788"></a>      <span class="k">if</span> <span class="p">(</span><span class="nx">d1</span> <span class="o">&lt;</span> <span class="nx">radians</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-789"></a>        <span class="k">if</span> <span class="p">(</span><span class="nx">p1</span><span class="p">)</span> <span class="nx">clipped</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">d3_geo_greatArcInterpolate</span><span class="p">(</span><span class="nx">p1</span><span class="p">,</span> <span class="nx">p2</span><span class="p">)((</span><span class="nx">d0</span> <span class="o">-</span> <span class="nx">radians</span><span class="p">)</span> <span class="o">/</span> <span class="p">(</span><span class="nx">d0</span> <span class="o">-</span> <span class="nx">d1</span><span class="p">)));</span>
<a name="cl-790"></a>        <span class="nx">clipped</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">p2</span><span class="p">);</span>
<a name="cl-791"></a>        <span class="nx">p0</span> <span class="o">=</span> <span class="nx">p1</span> <span class="o">=</span> <span class="kc">null</span><span class="p">;</span>
<a name="cl-792"></a>      <span class="p">}</span> <span class="k">else</span> <span class="p">{</span>
<a name="cl-793"></a>        <span class="nx">p1</span> <span class="o">=</span> <span class="nx">p2</span><span class="p">;</span>
<a name="cl-794"></a>        <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">p0</span> <span class="o">&amp;&amp;</span> <span class="nx">clipped</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-795"></a>          <span class="nx">clipped</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">d3_geo_greatArcInterpolate</span><span class="p">(</span><span class="nx">clipped</span><span class="cp">[</span><span class="nx">clipped.length</span> <span class="o">-</span> <span class="mi">1</span><span class="cp">]</span><span class="p">,</span> <span class="nx">p1</span><span class="p">)((</span><span class="nx">radians</span> <span class="o">-</span> <span class="nx">d0</span><span class="p">)</span> <span class="o">/</span> <span class="p">(</span><span class="nx">d1</span> <span class="o">-</span> <span class="nx">d0</span><span class="p">)));</span>
<a name="cl-796"></a>          <span class="nx">p0</span> <span class="o">=</span> <span class="nx">p1</span><span class="p">;</span>
<a name="cl-797"></a>        <span class="p">}</span>
<a name="cl-798"></a>      <span class="p">}</span>
<a name="cl-799"></a>      <span class="nx">d0</span> <span class="o">=</span> <span class="nx">d1</span><span class="p">;</span>
<a name="cl-800"></a>    <span class="p">}</span>
<a name="cl-801"></a>
<a name="cl-802"></a>    <span class="k">if</span> <span class="p">(</span><span class="nx">p1</span> <span class="o">&amp;&amp;</span> <span class="nx">clipped</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-803"></a>      <span class="nx">d1</span> <span class="o">=</span> <span class="nx">arc</span><span class="p">.</span><span class="nx">distance</span><span class="p">(</span><span class="nx">p2</span> <span class="o">=</span> <span class="nx">clipped</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">);</span>
<a name="cl-804"></a>      <span class="nx">clipped</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">d3_geo_greatArcInterpolate</span><span class="p">(</span><span class="nx">p1</span><span class="p">,</span> <span class="nx">p2</span><span class="p">)((</span><span class="nx">d0</span> <span class="o">-</span> <span class="nx">radians</span><span class="p">)</span> <span class="o">/</span> <span class="p">(</span><span class="nx">d0</span> <span class="o">-</span> <span class="nx">d1</span><span class="p">)));</span>
<a name="cl-805"></a>    <span class="p">}</span>
<a name="cl-806"></a>
<a name="cl-807"></a>    <span class="k">return</span> <span class="nx">resample</span><span class="p">(</span><span class="nx">clipped</span><span class="p">);</span>
<a name="cl-808"></a>  <span class="p">}</span>
<a name="cl-809"></a>
<a name="cl-810"></a>  <span class="c1">// Resample coordinates, creating great arcs between each.</span>
<a name="cl-811"></a>  <span class="kd">function</span> <span class="nx">resample</span><span class="p">(</span><span class="nx">coordinates</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-812"></a>    <span class="kd">var</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span>
<a name="cl-813"></a>        <span class="nx">n</span> <span class="o">=</span> <span class="nx">coordinates</span><span class="p">.</span><span class="nx">length</span><span class="p">,</span>
<a name="cl-814"></a>        <span class="nx">j</span><span class="p">,</span>
<a name="cl-815"></a>        <span class="nx">m</span><span class="p">,</span>
<a name="cl-816"></a>        <span class="nx">resampled</span> <span class="o">=</span> <span class="nx">n</span> <span class="o">?</span> <span class="cp">[</span><span class="nx">coordinates</span><span class="err">[</span><span class="mi">0</span><span class="cp">]</span><span class="p">]</span> <span class="o">:</span> <span class="nx">coordinates</span><span class="p">,</span>
<a name="cl-817"></a>        <span class="nx">resamples</span><span class="p">,</span>
<a name="cl-818"></a>        <span class="nx">origin</span> <span class="o">=</span> <span class="nx">arc</span><span class="p">.</span><span class="nx">source</span><span class="p">();</span>
<a name="cl-819"></a>
<a name="cl-820"></a>    <span class="k">while</span> <span class="p">(</span><span class="o">++</span><span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">n</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-821"></a>      <span class="nx">resamples</span> <span class="o">=</span> <span class="nx">arc</span><span class="p">.</span><span class="nx">source</span><span class="p">(</span><span class="nx">coordinates</span><span class="cp">[</span><span class="nx">i</span> <span class="o">-</span> <span class="mi">1</span><span class="cp">]</span><span class="p">)(</span><span class="nx">coordinates</span><span class="cp">[</span><span class="nx">i</span><span class="cp">]</span><span class="p">).</span><span class="nx">coordinates</span><span class="p">;</span>
<a name="cl-822"></a>      <span class="k">for</span> <span class="p">(</span><span class="nx">j</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span> <span class="nx">m</span> <span class="o">=</span> <span class="nx">resamples</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="o">++</span><span class="nx">j</span> <span class="o">&lt;</span> <span class="nx">m</span><span class="p">;)</span> <span class="nx">resampled</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">resamples</span><span class="cp">[</span><span class="nx">j</span><span class="cp">]</span><span class="p">);</span>
<a name="cl-823"></a>    <span class="p">}</span>
<a name="cl-824"></a>
<a name="cl-825"></a>    <span class="nx">arc</span><span class="p">.</span><span class="nx">source</span><span class="p">(</span><span class="nx">origin</span><span class="p">);</span>
<a name="cl-826"></a>    <span class="k">return</span> <span class="nx">resampled</span><span class="p">;</span>
<a name="cl-827"></a>  <span class="p">}</span>
<a name="cl-828"></a>
<a name="cl-829"></a>  <span class="nx">circle</span><span class="p">.</span><span class="nx">origin</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-830"></a>    <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="k">return</span> <span class="nx">origin</span><span class="p">;</span>
<a name="cl-831"></a>    <span class="nx">origin</span> <span class="o">=</span> <span class="nx">x</span><span class="p">;</span>
<a name="cl-832"></a>    <span class="k">return</span> <span class="nx">circle</span><span class="p">;</span>
<a name="cl-833"></a>  <span class="p">};</span>
<a name="cl-834"></a>
<a name="cl-835"></a>  <span class="nx">circle</span><span class="p">.</span><span class="nx">angle</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-836"></a>    <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="k">return</span> <span class="nx">degrees</span><span class="p">;</span>
<a name="cl-837"></a>    <span class="nx">radians</span> <span class="o">=</span> <span class="p">(</span><span class="nx">degrees</span> <span class="o">=</span> <span class="o">+</span><span class="nx">x</span><span class="p">)</span> <span class="o">*</span> <span class="nx">d3_geo_radians</span><span class="p">;</span>
<a name="cl-838"></a>    <span class="k">return</span> <span class="nx">circle</span><span class="p">;</span>
<a name="cl-839"></a>  <span class="p">};</span>
<a name="cl-840"></a>
<a name="cl-841"></a>  <span class="c1">// Precision is specified in degrees.</span>
<a name="cl-842"></a>  <span class="nx">circle</span><span class="p">.</span><span class="nx">precision</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-843"></a>    <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="k">return</span> <span class="nx">arc</span><span class="p">.</span><span class="nx">precision</span><span class="p">();</span>
<a name="cl-844"></a>    <span class="nx">arc</span><span class="p">.</span><span class="nx">precision</span><span class="p">(</span><span class="nx">x</span><span class="p">);</span>
<a name="cl-845"></a>    <span class="k">return</span> <span class="nx">circle</span><span class="p">;</span>
<a name="cl-846"></a>  <span class="p">};</span>
<a name="cl-847"></a>
<a name="cl-848"></a>  <span class="k">return</span> <span class="nx">circle</span><span class="p">;</span>
<a name="cl-849"></a><span class="p">}</span>
<a name="cl-850"></a><span class="nx">d3</span><span class="p">.</span><span class="nx">geo</span><span class="p">.</span><span class="nx">greatArc</span> <span class="o">=</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
<a name="cl-851"></a>  <span class="kd">var</span> <span class="nx">source</span> <span class="o">=</span> <span class="nx">d3_geo_greatArcSource</span><span class="p">,</span>
<a name="cl-852"></a>      <span class="nx">target</span> <span class="o">=</span> <span class="nx">d3_geo_greatArcTarget</span><span class="p">,</span>
<a name="cl-853"></a>      <span class="nx">precision</span> <span class="o">=</span> <span class="mi">6</span> <span class="o">*</span> <span class="nx">d3_geo_radians</span><span class="p">;</span>
<a name="cl-854"></a>
<a name="cl-855"></a>  <span class="kd">function</span> <span class="nx">greatArc</span><span class="p">()</span> <span class="p">{</span>
<a name="cl-856"></a>    <span class="kd">var</span> <span class="nx">a</span> <span class="o">=</span> <span class="k">typeof</span> <span class="nx">source</span> <span class="o">===</span> <span class="s2">&quot;function&quot;</span> <span class="o">?</span> <span class="nx">source</span><span class="p">.</span><span class="nx">apply</span><span class="p">(</span><span class="k">this</span><span class="p">,</span> <span class="nx">arguments</span><span class="p">)</span> <span class="o">:</span> <span class="nx">source</span><span class="p">,</span>
<a name="cl-857"></a>        <span class="nx">b</span> <span class="o">=</span> <span class="k">typeof</span> <span class="nx">target</span> <span class="o">===</span> <span class="s2">&quot;function&quot;</span> <span class="o">?</span> <span class="nx">target</span><span class="p">.</span><span class="nx">apply</span><span class="p">(</span><span class="k">this</span><span class="p">,</span> <span class="nx">arguments</span><span class="p">)</span> <span class="o">:</span> <span class="nx">target</span><span class="p">,</span>
<a name="cl-858"></a>        <span class="nx">i</span> <span class="o">=</span> <span class="nx">d3_geo_greatArcInterpolate</span><span class="p">(</span><span class="nx">a</span><span class="p">,</span> <span class="nx">b</span><span class="p">),</span>
<a name="cl-859"></a>        <span class="nx">dt</span> <span class="o">=</span> <span class="nx">precision</span> <span class="o">/</span> <span class="nx">i</span><span class="p">.</span><span class="nx">d</span><span class="p">,</span>
<a name="cl-860"></a>        <span class="nx">t</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span>
<a name="cl-861"></a>        <span class="nx">coordinates</span> <span class="o">=</span> <span class="cp">[</span><span class="nx">a</span><span class="cp">]</span><span class="p">;</span>
<a name="cl-862"></a>    <span class="k">while</span> <span class="p">((</span><span class="nx">t</span> <span class="o">+=</span> <span class="nx">dt</span><span class="p">)</span> <span class="o">&lt;</span> <span class="mi">1</span><span class="p">)</span> <span class="nx">coordinates</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">i</span><span class="p">(</span><span class="nx">t</span><span class="p">));</span>
<a name="cl-863"></a>    <span class="nx">coordinates</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">b</span><span class="p">);</span>
<a name="cl-864"></a>    <span class="k">return</span> <span class="p">{</span>
<a name="cl-865"></a>      <span class="nx">type</span><span class="o">:</span> <span class="s2">&quot;LineString&quot;</span><span class="p">,</span>
<a name="cl-866"></a>      <span class="nx">coordinates</span><span class="o">:</span> <span class="nx">coordinates</span>
<a name="cl-867"></a>    <span class="p">};</span>
<a name="cl-868"></a>  <span class="p">}</span>
<a name="cl-869"></a>
<a name="cl-870"></a>  <span class="c1">// Length returned in radians; multiply by radius for distance.</span>
<a name="cl-871"></a>  <span class="nx">greatArc</span><span class="p">.</span><span class="nx">distance</span> <span class="o">=</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
<a name="cl-872"></a>    <span class="kd">var</span> <span class="nx">a</span> <span class="o">=</span> <span class="k">typeof</span> <span class="nx">source</span> <span class="o">===</span> <span class="s2">&quot;function&quot;</span> <span class="o">?</span> <span class="nx">source</span><span class="p">.</span><span class="nx">apply</span><span class="p">(</span><span class="k">this</span><span class="p">,</span> <span class="nx">arguments</span><span class="p">)</span> <span class="o">:</span> <span class="nx">source</span><span class="p">,</span>
<a name="cl-873"></a>        <span class="nx">b</span> <span class="o">=</span> <span class="k">typeof</span> <span class="nx">target</span> <span class="o">===</span> <span class="s2">&quot;function&quot;</span> <span class="o">?</span> <span class="nx">target</span><span class="p">.</span><span class="nx">apply</span><span class="p">(</span><span class="k">this</span><span class="p">,</span> <span class="nx">arguments</span><span class="p">)</span> <span class="o">:</span> <span class="nx">target</span><span class="p">;</span>
<a name="cl-874"></a>     <span class="k">return</span> <span class="nx">d3_geo_greatArcInterpolate</span><span class="p">(</span><span class="nx">a</span><span class="p">,</span> <span class="nx">b</span><span class="p">).</span><span class="nx">d</span><span class="p">;</span>
<a name="cl-875"></a>  <span class="p">};</span>
<a name="cl-876"></a>
<a name="cl-877"></a>  <span class="nx">greatArc</span><span class="p">.</span><span class="nx">source</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-878"></a>    <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="k">return</span> <span class="nx">source</span><span class="p">;</span>
<a name="cl-879"></a>    <span class="nx">source</span> <span class="o">=</span> <span class="nx">x</span><span class="p">;</span>
<a name="cl-880"></a>    <span class="k">return</span> <span class="nx">greatArc</span><span class="p">;</span>
<a name="cl-881"></a>  <span class="p">};</span>
<a name="cl-882"></a>
<a name="cl-883"></a>  <span class="nx">greatArc</span><span class="p">.</span><span class="nx">target</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-884"></a>    <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="k">return</span> <span class="nx">target</span><span class="p">;</span>
<a name="cl-885"></a>    <span class="nx">target</span> <span class="o">=</span> <span class="nx">x</span><span class="p">;</span>
<a name="cl-886"></a>    <span class="k">return</span> <span class="nx">greatArc</span><span class="p">;</span>
<a name="cl-887"></a>  <span class="p">};</span>
<a name="cl-888"></a>
<a name="cl-889"></a>  <span class="c1">// Precision is specified in degrees.</span>
<a name="cl-890"></a>  <span class="nx">greatArc</span><span class="p">.</span><span class="nx">precision</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-891"></a>    <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="k">return</span> <span class="nx">precision</span> <span class="o">/</span> <span class="nx">d3_geo_radians</span><span class="p">;</span>
<a name="cl-892"></a>    <span class="nx">precision</span> <span class="o">=</span> <span class="nx">x</span> <span class="o">*</span> <span class="nx">d3_geo_radians</span><span class="p">;</span>
<a name="cl-893"></a>    <span class="k">return</span> <span class="nx">greatArc</span><span class="p">;</span>
<a name="cl-894"></a>  <span class="p">};</span>
<a name="cl-895"></a>
<a name="cl-896"></a>  <span class="k">return</span> <span class="nx">greatArc</span><span class="p">;</span>
<a name="cl-897"></a><span class="p">};</span>
<a name="cl-898"></a>
<a name="cl-899"></a><span class="kd">function</span> <span class="nx">d3_geo_greatArcSource</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-900"></a>  <span class="k">return</span> <span class="nx">d</span><span class="p">.</span><span class="nx">source</span><span class="p">;</span>
<a name="cl-901"></a><span class="p">}</span>
<a name="cl-902"></a>
<a name="cl-903"></a><span class="kd">function</span> <span class="nx">d3_geo_greatArcTarget</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-904"></a>  <span class="k">return</span> <span class="nx">d</span><span class="p">.</span><span class="nx">target</span><span class="p">;</span>
<a name="cl-905"></a><span class="p">}</span>
<a name="cl-906"></a>
<a name="cl-907"></a><span class="kd">function</span> <span class="nx">d3_geo_greatArcInterpolate</span><span class="p">(</span><span class="nx">a</span><span class="p">,</span> <span class="nx">b</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-908"></a>  <span class="kd">var</span> <span class="nx">x0</span> <span class="o">=</span> <span class="nx">a</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span> <span class="o">*</span> <span class="nx">d3_geo_radians</span><span class="p">,</span> <span class="nx">cx0</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">cos</span><span class="p">(</span><span class="nx">x0</span><span class="p">),</span> <span class="nx">sx0</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">sin</span><span class="p">(</span><span class="nx">x0</span><span class="p">),</span>
<a name="cl-909"></a>      <span class="nx">y0</span> <span class="o">=</span> <span class="nx">a</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span> <span class="o">*</span> <span class="nx">d3_geo_radians</span><span class="p">,</span> <span class="nx">cy0</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">cos</span><span class="p">(</span><span class="nx">y0</span><span class="p">),</span> <span class="nx">sy0</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">sin</span><span class="p">(</span><span class="nx">y0</span><span class="p">),</span>
<a name="cl-910"></a>      <span class="nx">x1</span> <span class="o">=</span> <span class="nx">b</span><span class="cp">[</span><span class="mi">0</span><span class="cp">]</span> <span class="o">*</span> <span class="nx">d3_geo_radians</span><span class="p">,</span> <span class="nx">cx1</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">cos</span><span class="p">(</span><span class="nx">x1</span><span class="p">),</span> <span class="nx">sx1</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">sin</span><span class="p">(</span><span class="nx">x1</span><span class="p">),</span>
<a name="cl-911"></a>      <span class="nx">y1</span> <span class="o">=</span> <span class="nx">b</span><span class="cp">[</span><span class="mi">1</span><span class="cp">]</span> <span class="o">*</span> <span class="nx">d3_geo_radians</span><span class="p">,</span> <span class="nx">cy1</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">cos</span><span class="p">(</span><span class="nx">y1</span><span class="p">),</span> <span class="nx">sy1</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">sin</span><span class="p">(</span><span class="nx">y1</span><span class="p">),</span>
<a name="cl-912"></a>      <span class="nx">d</span> <span class="o">=</span> <span class="nx">interpolate</span><span class="p">.</span><span class="nx">d</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">acos</span><span class="p">(</span><span class="nb">Math</span><span class="p">.</span><span class="nx">max</span><span class="p">(</span><span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">min</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="nx">sy0</span> <span class="o">*</span> <span class="nx">sy1</span> <span class="o">+</span> <span class="nx">cy0</span> <span class="o">*</span> <span class="nx">cy1</span> <span class="o">*</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">cos</span><span class="p">(</span><span class="nx">x1</span> <span class="o">-</span> <span class="nx">x0</span><span class="p">)))),</span>
<a name="cl-913"></a>      <span class="nx">sd</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">sin</span><span class="p">(</span><span class="nx">d</span><span class="p">);</span>
<a name="cl-914"></a>
<a name="cl-915"></a>  <span class="c1">// From http://williams.best.vwh.net/avform.htm#Intermediate</span>
<a name="cl-916"></a>  <span class="kd">function</span> <span class="nx">interpolate</span><span class="p">(</span><span class="nx">t</span><span class="p">)</span> <span class="p">{</span>
<a name="cl-917"></a>    <span class="kd">var</span> <span class="nx">A</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">sin</span><span class="p">(</span><span class="nx">d</span> <span class="o">-</span> <span class="p">(</span><span class="nx">t</span> <span class="o">*=</span> <span class="nx">d</span><span class="p">))</span> <span class="o">/</span> <span class="nx">sd</span><span class="p">,</span>
<a name="cl-918"></a>        <span class="nx">B</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">sin</span><span class="p">(</span><span class="nx">t</span><span class="p">)</span> <span class="o">/</span> <span class="nx">sd</span><span class="p">,</span>
<a name="cl-919"></a>        <span class="nx">x</span> <span class="o">=</span> <span class="nx">A</span> <span class="o">*</span> <span class="nx">cy0</span> <span class="o">*</span> <span class="nx">cx0</span> <span class="o">+</span> <span class="nx">B</span> <span class="o">*</span> <span class="nx">cy1</span> <span class="o">*</span> <span class="nx">cx1</span><span class="p">,</span>
<a name="cl-920"></a>        <span class="nx">y</span> <span class="o">=</span> <span class="nx">A</span> <span class="o">*</span> <span class="nx">cy0</span> <span class="o">*</span> <span class="nx">sx0</span> <span class="o">+</span> <span class="nx">B</span> <span class="o">*</span> <span class="nx">cy1</span> <span class="o">*</span> <span class="nx">sx1</span><span class="p">,</span>
<a name="cl-921"></a>        <span class="nx">z</span> <span class="o">=</span> <span class="nx">A</span> <span class="o">*</span> <span class="nx">sy0</span>       <span class="o">+</span> <span class="nx">B</span> <span class="o">*</span> <span class="nx">sy1</span><span class="p">;</span>
<a name="cl-922"></a>    <span class="k">return</span> <span class="cp">[</span>
<a name="cl-923"></a>      <span class="nx">Math.atan2</span><span class="p">(</span><span class="nx">y</span><span class="p">,</span> <span class="nx">x</span><span class="p">)</span> <span class="o">/</span> <span class="nx">d3_geo_radians</span><span class="p">,</span>
<a name="cl-924"></a>      <span class="nx">Math.atan2</span><span class="p">(</span><span class="nx">z</span><span class="p">,</span> <span class="nx">Math.sqrt</span><span class="p">(</span><span class="nx">x</span> <span class="o">*</span> <span class="nx">x</span> <span class="o">+</span> <span class="nx">y</span> <span class="o">*</span> <span class="nx">y</span><span class="p">))</span> <span class="o">/</span> <span class="nx">d3_geo_radians</span>
<a name="cl-925"></a>    <span class="cp">]</span><span class="p">;</span>
<a name="cl-926"></a>  <span class="p">}</span>
<a name="cl-927"></a>
<a name="cl-928"></a>  <span class="k">return</span> <span class="nx">interpolate</span><span class="p">;</span>
<a name="cl-929"></a><span class="p">}</span>
<a name="cl-930"></a><span class="nx">d3</span><span class="p">.</span><span class="nx">geo</span><span class="p">.</span><span class="nx">greatCircle</span> <span class="o">=</span> <span class="nx">d3</span><span class="p">.</span><span class="nx">geo</span><span class="p">.</span><span class="nx">circle</span><span class="p">;</span>
<a name="cl-931"></a><span class="p">})();</span>
</pre></div>
</td></tr></table>
                </div>
              
            
          
        
      </div>
    </div>



<div class="mask"></div>



  <script id="branch-dialog-template" type="text/html">
  

<div class="tabbed-filter-widget branch-dialog">
  <div class="tabbed-filter">
    <input placeholder="Filter branches" class="filter-box" autosave="branch-dropdown-2444443" type="text">
    [[^ignoreTags]]
      <div class="aui-tabs horizontal-tabs aui-tabs-disabled filter-tabs">
        <ul class="tabs-menu">
          <li class="menu-item active-tab"><a href="#branches">Branches</a></li>
          <li class="menu-item"><a href="#tags">Tags</a></li>
        </ul>
      </div>
    [[/ignoreTags]]
  </div>
  
    <div class="tab-pane active-pane" id="branches" data-filter-placeholder="Filter branches">
      <ol class="filter-list">
        <li class="empty-msg">No matching branches</li>
        [[#branches]]
          
            [[#hasMultipleHeads]]
              [[#heads]]
                <li class="comprev filter-item">
                  <a class="pjax-trigger" href="/ufohunterscom/ufohunters-site/src/[[changeset]]/app/assets/javascripts/world/d3.geo.js?at=[[safeName]]"
                     title="[[name]]">
                    [[name]] ([[shortChangeset]])
                  </a>
                </li>
              [[/heads]]
            [[/hasMultipleHeads]]
            [[^hasMultipleHeads]]
              <li class="comprev filter-item">
                <a class="pjax-trigger" href="/ufohunterscom/ufohunters-site/src/[[changeset]]/app/assets/javascripts/world/d3.geo.js?at=[[safeName]]" title="[[name]]">
                  [[name]]
                </a>
              </li>
            [[/hasMultipleHeads]]
          
        [[/branches]]
      </ol>
    </div>
    <div class="tab-pane" id="tags" data-filter-placeholder="Filter tags">
      <ol class="filter-list">
        <li class="empty-msg">No matching tags</li>
        [[#tags]]
          <li class="comprev filter-item">
            <a class="pjax-trigger" href="/ufohunterscom/ufohunters-site/src/[[changeset]]/app/assets/javascripts/world/d3.geo.js?at=[[safeName]]" title="[[name]]">
              [[name]]
            </a>
          </li>
        [[/tags]]
      </ol>
    </div>
  
</div>

</script>



  </div>

        

<form id="file-search-form" action="#"
  
  data-revision="8a649fb16334e69774ce4b35aae30c2be31469f5"
  data-branch="v1_stable">
  <input type="text" id="file-search-query" class="loading">
  <div id="filtered-files"></div>
  <div class="tip"><em>Tip:</em> Filter by directory path e.g. <strong>/media app.js</strong> to search for public<strong>/media/app.js</strong>.</div>
  <div class="tip"><em>Tip:</em> Use camelCasing e.g. <strong>ProjME</strong> to search for <strong>ProjectModifiedE</strong>vent.java.</div>
  <div class="tip"><em>Tip:</em> Filter by extension type e.g. <strong>/repo .js</strong> to search for all <strong>.js</strong> files in the <strong>/repo</strong> directory.</div>
  <div class="tip"><em>Tip:</em> Separate your search with spaces e.g. <strong>/ssh pom.xml</strong> to search for src<strong>/ssh/pom.xml</strong>.</div>
  <div class="tip"><em>Tip:</em> Use ↑ and ↓ arrow keys to navigate and <strong>return</strong> to view the file.</div>
  <div class="tip mod-osx"><em>Tip:</em> You can also navigate files with <strong>Ctrl+j</strong> <em>(next)</em> and <strong>Ctrl+k</strong> <em>(previous)</em> and view the file with <strong>Ctrl+o</strong>.</div>
  <div class="tip mod-win"><em>Tip:</em> You can also navigate files with <strong>Alt+j</strong> <em>(next)</em> and <strong>Alt+k</strong> <em>(previous)</em> and view the file with <strong>Alt+o</strong>.</div>
  <script id="filtered-files-template" type="text/html">
  

<table class="aui bb-list">
  <thead>
    <tr class="assistive">
      <th class="name">Filename</th>
    </tr>
  </thead>
  <tbody>
    [[#files]]
    <tr class="iterable-item">
      <td class="name [[#isDirectory]]directory[[/isDirectory]]">
        <span class="aui-icon aui-icon-small[[#isDirectory]] aui-iconfont-devtools-folder-closed[[/isDirectory]][[^isDirectory]] aui-iconfont-devtools-file[[/isDirectory]]"></span>
        <a href="/ufohunterscom/ufohunters-site/src/[[node]]/[[name]][[#branch]][[#isDirectory]]/[[/isDirectory]]?at=[[branch]][[/branch]]"
           title="[[name]]" class="execute" tabindex="-1">
          [[&highlightedName]]
        </a>
      </td>
    </tr>
    [[/files]]
  </tbody>
</table>

</script>
</form>

      </div>
    </div>
  </div>

    </div>
  </div>

  <footer id="footer" role="contentinfo">
    <section class="footer-body">
      
  <ul>
    <li>
      <a class="support-ga" target="_blank"
           data-support-gaq-page="Blog"
           href="http://blog.bitbucket.org">Blog</a>
    </li>
    <li>
      <a class="support-ga" target="_blank"
           data-support-gaq-page="Home"
           href="/support">Support</a>
    </li>
    <li>
      <a class="support-ga"
           data-support-gaq-page="PlansPricing"
           href="/plans">Plans &amp; pricing</a>
    </li>
    <li>
      <a class="support-ga" target="_blank"
           data-support-gaq-page="DocumentationHome"
           href="//confluence.atlassian.com/display/BITBUCKET">Documentation</a>
    </li>
    <li>
      <a class="support-ga" target="_blank"
           data-support-gaq-page="DocumentationAPI"
           href="//confluence.atlassian.com/x/IYBGDQ">API</a>
    </li>
    <li>
      <a class="support-ga" target="_blank"
           data-support-gaq-page="SiteStatus"
           href="http://status.bitbucket.org/">Server status</a>
    </li>
    <li>
      <a class="support-ga" id="meta-info"
           data-support-gaq-page="MetaInfo"
           href="#">Version info</a>
    </li>
    <li>
      <a class="support-ga" target="_blank"
           data-support-gaq-page="EndUserAgreement"
           href="//www.atlassian.com/end-user-agreement?utm_source=bitbucket&amp;utm_medium=link&amp;utm_campaign=footer">Terms of service</a>
    </li>
    <li>
      <a class="support-ga" target="_blank"
           data-support-gaq-page="PrivacyPolicy"
           href="//www.atlassian.com/company/privacy?utm_source=bitbucket&amp;utm_medium=link&amp;utm_campaign=footer">Privacy policy</a>
    </li>
  </ul>
  <div id="meta-info-content" style="display: none;">
    <ul>
      
        
          <li><a href="/account/user/jcarlosgarcia/"
                 class="view-language-link">English</a></li>
        
      
      <li>
        <a class="support-ga" target="_blank"
           data-support-gaq-page="GitDocumentation"
           href="http://git-scm.com/">Git 1.8.5.2</a>
      </li>
      <li>
        <a class="support-ga" target="_blank"
           data-support-gaq-page="HgDocumentation"
           href="http://mercurial.selenic.com/">Mercurial 2.2.2</a>
      </li>
      <li>
        <a class="support-ga" target="_blank"
           data-support-gaq-page="DjangoDocumentation"
           href="https://www.djangoproject.com/">Django 1.4.6</a>
      </li>
      <li>
        <a class="support-ga" target="_blank"
           data-support-gaq-page="PythonDocumentation"
           href="http://www.python.org/">Python 2.7.3</a>
      </li>
      <li>
        <a class="support-ga" target="_blank"
           data-support-gaq-page="DeployedVersion"
           href="#">74882546d79b / 4f5da60499c6 @ app16</a>
      </li>
    </ul>
  </div>
  <ul class="atlassian-links">
    <li>
      <a id="atlassian-jira-link" target="_blank" title="Track everything – bugs, tasks, deadlines, code – and pull reports to stay informed."
         href="http://www.atlassian.com/software/jira?utm_source=bitbucket&amp;utm_medium=link&amp;utm_campaign=bitbucket_footer">JIRA</a>
    </li>
    <li>
      <a id="atlassian-confluence-link" target="_blank" title="Content Creation, Collaboration & Knowledge Sharing for Teams."
         href="http://www.atlassian.com/software/confluence/overview/team-collaboration-software?utm_source=bitbucket&amp;utm_medium=link&amp;utm_campaign=bitbucket_footer">Confluence</a>
    </li>
    <li>
      <a id="atlassian-bamboo-link" target="_blank" title="Continuous integration and deployment, release management."
         href="http://www.atlassian.com/software/bamboo/overview?utm_source=bitbucket&amp;utm_medium=link&amp;utm_campaign=bitbucket_footer">Bamboo</a>
    </li>
    <li>
      <a id="atlassian-stash-link" target="_blank" title="Git repo management, behind your firewall and Enterprise-ready."
         href="http://www.atlassian.com/software/stash/overview?utm_source=bitbucket&amp;utm_medium=link&amp;utm_campaign=bitbucket_footer">Stash</a>
    </li>
    <li>
      <a id="atlassian-sourcetree-link" target="_blank" title="A free Git and Mercurial desktop client for Mac or Windows."
         href="http://www.sourcetreeapp.com/?utm_source=bitbucket&amp;utm_medium=link&amp;utm_campaign=bitbucket_footer">SourceTree</a>
    </li>
    <li>
      <a id="atlassian-hipchat-link" target="_blank" title="Group chat and IM built for teams."
         href="http://www.hipchat.com/?utm_source=bitbucket&amp;utm_medium=link&amp;utm_campaign=bitbucket_footer">HipChat</a>
    </li>
  </ul>
  <div id="footer-logo">
    <a target="_blank" title="Bitbucket is developed by Atlassian in San Francisco."
       href="http://www.atlassian.com?utm_source=bitbucket&amp;utm_medium=logo&amp;utm_campaign=bitbucket_footer">Atlassian</a>
  </div>
  <script id="share-form-template" type="text/html">
  

<div class="error aui-message hidden">
  <span class="aui-icon icon-error"></span>
  <div class="message"></div>
</div>
<table class="widget bb-list aui">
  <thead>
  <tr class="assistive">
    <th class="user">User</th>
    <th class="role">Role</th>
    <th class="actions">Actions</th>
  </tr>
  </thead>
  <tbody>
  <tr class="form">
    <td colspan="3">
      <form>
        <input type="text" class="user-or-email text user-input"
               placeholder="Username or email address"
               [[#disabled]]disabled[[/disabled]]>
        <button type="submit" class="aui-button aui-style" disabled>Add</button>
      </form>
    </td>
  </tr>
  </tbody>
</table>

</script>
  <script id="share-detail-template" type="text/html">
  

[[#username]]
<td class="user
           [[#hasCustomGroups]]custom-groups[[/hasCustomGroups]]"
    [[#error]]data-error="[[error]]"[[/error]]>
  <div title="[[displayName]]">
    <a href="/[[username]]" class="user">
      <img class="avatar avatar16" src="[[avatar]]" />
      <span>[[displayName]]</span>
    </a>
  </div>
</td>
[[/username]]
[[^username]]
<td class="email
           [[#hasCustomGroups]]custom-groups[[/hasCustomGroups]]"
    [[#error]]data-error="[[error]]"[[/error]]>
  <div title="[[email]]">
    <span class="aui-icon aui-icon-small aui-iconfont-email"></span>
    [[email]]
  </div>
</td>
[[/username]]
<td class="role
           [[#hasCustomGroups]]custom-groups[[/hasCustomGroups]]">
  <div>
    [[#group]]
      [[#hasCustomGroups]]
        <select class="group [[#noGroupChoices]]hidden[[/noGroupChoices]]">
          [[#groups]]
            <option value="[[slug]]"
                    [[#isSelected]]selected[[/isSelected]]>
              [[name]]
            </option>
          [[/groups]]
        </select>
      [[/hasCustomGroups]]
      [[^hasCustomGroups]]
      <label>
        <input type="checkbox" class="admin"
               [[#isAdmin]]checked[[/isAdmin]]>
        Administrator
      </label>
      [[/hasCustomGroups]]
    [[/group]]
    [[^group]]
      <ul>
        <li class="permission aui-lozenge aui-lozenge-complete
                   [[^read]]aui-lozenge-subtle[[/read]]"
            data-permission="read">
          read
        </li>
        <li class="permission aui-lozenge aui-lozenge-complete
                   [[^write]]aui-lozenge-subtle[[/write]]"
            data-permission="write">
          write
        </li>
        <li class="permission aui-lozenge aui-lozenge-complete
                   [[^admin]]aui-lozenge-subtle[[/admin]]"
            data-permission="admin">
          admin
        </li>
      </ul>
    [[/group]]
  </div>
</td>
<td class="actions
           [[#hasCustomGroups]]custom-groups[[/hasCustomGroups]]">
  <div>
    <a href="#" class="delete">
      <span class="aui-icon aui-icon-small aui-iconfont-remove">Delete</span>
    </a>
  </div>
</td>

</script>
  <script id="share-team-template" type="text/html">
  

<div class="clearfix">
  <span class="team-avatar-container">
    <img src="[[avatar]]" alt="[[display_name]]" title="[[display_name]]" class="avatar avatar32" />
  </span>
  <span class="team-name-container">
    [[display_name]]
  </span>
</div>
<p class="helptext">
  
    Existing users are granted access to this team immediately.
    New users will be sent an invitation.
  
</p>
<div class="share-form"></div>

</script>
  

    </section>
  </footer>
</div>


  
  <script id="require-js"
          src="https://d3oaxc4q5k2d6q.cloudfront.net/m/4f5da60499c6/amd/build/main.js"
          data-main="https://d3oaxc4q5k2d6q.cloudfront.net/m/4f5da60499c6/amd/build/main"
          data-page-module="repo/index"></script>




<script>
  (function () {
    var ga = document.createElement('script');
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    ga.setAttribute('async', 'true');
    document.documentElement.firstChild.appendChild(ga);
  }());
</script>


  

<script id="source-changeset" type="text/html">
  

<a href="/ufohunterscom/ufohunters-site/src/[[raw_node]]/[[path]]?at=v1_stable"
   class="[[#selected]]highlight[[/selected]]"
   data-hash="[[node]]">
  [[#author.username]]
    <img class="avatar avatar16" src="[[author.avatar]]"/>
    <span class="author" title="[[raw_author]]">[[author.display_name]]</span>
  [[/author.username]]
  [[^author.username]]
    <img class="avatar avatar16" src="https://d3oaxc4q5k2d6q.cloudfront.net/m/4f5da60499c6/img/default_avatar/16/user_blue.png"/>
    <span class="author unmapped" title="[[raw_author]]">[[author]]</span>
  [[/author.username]]
  <time datetime="[[utctimestamp]]" data-title="true">[[utctimestamp]]</time>
  <span class="message">[[message]]</span>
</a>

</script>
<script id="embed-template" type="text/html">
  

<form class="aui embed">
  <label for="embed-code">Embed this source in another page:</label>
  <input type="text" readonly="true" value="&lt;script src=&quot;[[url]]&quot;&gt;&lt;/script&gt;" id="embed-code">
</form>

</script>
<script id="edit-form-template" type="text/html">
  


<form class="edit-form aui"
      data-repository="[[owner]]/[[slug]]"
      data-destination-repository="[[destinationOwner]]/[[destinationSlug]]"
      data-local-id="[[localID]]"
      data-is-writer="[[#isWriter]]true[[/isWriter]][[^isWriter]]false[[/isWriter]]"
      data-has-push-access="[[#hasPushAccess]]true[[/hasPushAccess]][[^hasPushAccess]]false[[/hasPushAccess]]"
      data-is-pull-request="[[#isPullRequest]]true[[/isPullRequest]][[^isPullRequest]]false[[/isPullRequest]]"
      data-hash="[[hash]]"
      data-branch="[[branch]]"
      data-path="[[path]]"
      data-preview-url="/xhr/[[owner]]/[[slug]]/preview/[[hash]]/[[encodedPath]]"
      data-preview-error="We had trouble generating your preview."
      data-unsaved-changes-error="Your changes will be lost. Are you sure you want to leave?">
  <div class="toolbar clearfix">
    <div class="primary">
      <h2>
        
          Editing <strong>[[path]]</strong> on branch: <strong>[[branch]]</strong>
        
      </h2>
    </div>
    <div class="secondary">
      <div class="hunk-nav aui-buttons">
        <button class="prev-hunk-button aui-button aui-button aui-style"
              disabled="disabled" aria-disabled="true" title="previous change">&#x25B2;</button>
        <button class="next-hunk-button aui-button aui-button aui-style"
              disabled="disabled" aria-disabled="true" title="next change">&#x25BC;</button>
      </div>
    </div>
  </div>
  <div class="file-editor">
    <textarea id="id_source">[[content]]</textarea>
  </div>
  <div class="preview-pane"></div>
  <div class="toolbar footer-toolbar clearfix">
    <div class="primary">
      <div id="syntax-mode" class="field">
        <label for="id_syntax-mode">Syntax mode:</label>
        <select id="id_syntax-mode">
          [[#syntaxes]]
            <option value="[[#mime]][[mime]][[/mime]][[^mime]][[mode]][[/mime]]">[[label]]</option>
          [[/syntaxes]]
        </select>
      </div>
      <div id="indent-mode" class="field">
        <label for="id_indent-mode">Indent mode:</label>
        <select id="id_indent-mode">
          <option value="tabs">Tabs</option>
          <option value="spaces">Spaces</option>
        </select>
      </div>
      <div id="indent-size" class="field">
        <label for="id_indent-size">Indent size:</label>
        <select id="id_indent-size">
          <option value="2">2</option>
          <option value="4">4</option>
          <option value="8">8</option>
        </select>
      </div>
    </div>
    <div class="secondary">
      <button class="preview-button aui-button aui-style"
              disabled="disabled" aria-disabled="true"
              data-preview-label="View diff"
              data-edit-label="Edit file">View diff</button>
      <button class="save-button aui-button aui-button-primary aui-style"
              disabled="disabled" aria-disabled="true">Commit</button>
      <a class="cancel-link" href="#">Cancel</a>
    </div>
  </div>
</form>

</script>
<script id="commit-form-template" type="text/html">
  

<form class="aui commit-form"
      data-title="Commit changes"
      data-default-message="[[filename]] edited online with Bitbucket"
      data-fork-error="We had trouble creating your fork."
      data-commit-error="We had trouble committing your changes."
      data-pull-request-error="We had trouble creating your pull request."
      data-update-error="We had trouble updating your pull request."
      data-branch-conflict-error="A branch with that name already exists."
      data-forking-message="Forking repository"
      data-committing-message="Committing changes"
      data-merging-message="Branching and merging changes"
      data-creating-pr-message="Creating pull request"
      data-updating-pr-message="Updating pull request"
      data-cta-label="Commit"
      data-cancel-label="Cancel">
  <div class="aui-message error hidden">
    <span class="aui-icon icon-error"></span>
    <span class="message"></span>
  </div>
  [[^isWriter]]
    <div class="aui-message info">
      <span class="aui-icon icon-info"></span>
      <p class="title">
        
          You don't have write access to this repository.
        
      </p>
      <span class="message">
        
          We'll create a fork for your changes and submit a
          pull request back to this repository.
        
      </span>
    </div>
  [[/isWriter]]
  <div class="field-group">
    <label for="id_message">Commit message</label>
    <textarea id="id_message" class="textarea"></textarea>
  </div>
  [[^isPullRequest]]
    [[#isWriter]]
      <fieldset class="group">
        <div class="checkbox">
          [[#hasPushAccess]]
            <input id="id_create-pullrequest" class="checkbox" type="checkbox">
            <label for="id_create-pullrequest">Create a pull request for this change</label>
          [[/hasPushAccess]]
          [[^hasPushAccess]]
            <input id="id_create-pullrequest" class="checkbox" type="checkbox" checked="checked" aria-disabled="true" disabled="true">
            <label for="id_create-pullrequest" title="Branch restrictions do not allow you to update this branch.">Create a pull request for this change</label>
          [[/hasPushAccess]]

        </div>
      </fieldset>
      <div id="pr-fields">
        <div id="branch-name-group" class="field-group">
          <label for="id_branch-name">Branch name</label>
          <input type="text" id="id_branch-name" class="text">
        </div>
        <div id="reviewers-group" class="field-group"
              data-api-url="/ufohunterscom/ufohunters-site/pull-request/xhr/reviewer/ufohunterscom/ufohunters-site/:reviewer_name">
          <label for="participants">Reviewers</label>
          <select id="participants" name="reviewers" multiple></select>
          <div class="error"></div>
          
        </div>
      </div>
    [[/isWriter]]
  [[/isPullRequest]]
  <button type="submit" id="id_submit">Commit</button>
</form>

</script>
<script id="merge-message-template" type="text/html">
  Merged [[hash]] into [[branch]]

[[message]]

</script>
<script id="commit-merge-error-template" type="text/html">
  



  We had trouble merging your changes. We stored them on the <strong>[[branch]]</strong> branch, so feel free to
  <a href="/[[owner]]/[[slug]]/full-commit/[[hash]]/[[path]]?at=[[encodedBranch]]">view them</a> or
  <a href="#" class="create-pull-request-link">create a pull request</a>.


</script>



<div data-modules="components/mentions/index">
  <script id="mention-result" type="text/html">
  
<img class="avatar avatar24" src="[[avatar_url]]">
[[#display_name]]
  <span class="display-name">[[&display_name]]</span> <small class="username">[[&username]]</small>
[[/display_name]]
[[^display_name]]
  <span class="username">[[&username]]</span>
[[/display_name]]
[[#is_teammate]][[^is_team]]
  <span class="aui-lozenge aui-lozenge-complete aui-lozenge-subtle">teammate</span>
[[/is_team]][[/is_teammate]]

</script>
  <script id="mention-call-to-action" type="text/html">
  
[[^query]]
<li class="bb-typeahead-item">Begin typing to search for a user</li>
[[/query]]
[[#query]]
<li class="bb-typeahead-item">Continue typing to search for a user</li>
[[/query]]

</script>
  <script id="mention-no-results" type="text/html">
  
[[^searching]]
<li class="bb-typeahead-item">Found no matching users for <em>[[query]]</em>.</li>
[[/searching]]
[[#searching]]
<li class="bb-typeahead-item bb-typeahead-searching">Searching for <em>[[query]]</em>.</li>
[[/searching]]

</script>
  
    <div id="recently-mentioned-930876"
        data-value="[]"></div>
  
</div>


  

<!--[if lt IE 9]><script src="https://d3oaxc4q5k2d6q.cloudfront.net/m/4f5da60499c6/lib/aui/js/aui-ie.js"></script><![endif]-->
<script type="text/javascript">if(!NREUMQ.f){NREUMQ.f=function(){NREUMQ.push(["load",new Date().getTime()]);var e=document.createElement("script");e.type="text/javascript";e.src=(("http:"===document.location.protocol)?"http:":"https:")+"//"+"js-agent.newrelic.com/nr-100.js";document.body.appendChild(e);if(NREUMQ.a)NREUMQ.a();};NREUMQ.a=window.onload;window.onload=NREUMQ.f;};NREUMQ.push(["nrfj","beacon-2.newrelic.com","a2cef8c3d3","1841284","Z11RZxdWW0cEVkYLDV4XdUYLVEFdClsdAAtEWkZQDlJBGgRFQhFMQl1DXFcZQ10AQkFYBFlUVlEXWEJHAA==",0,539,new Date().getTime(),"","","","",""]);</script></body>
</html>
