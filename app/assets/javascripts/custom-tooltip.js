<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta charset="utf-8">
  <title>
  ufohunterscom / ufohunters-site 
  / source  / app / assets / javascripts / custom-tooltip.js
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
        
          <a href="/ufohunterscom/ufohunters-site/src/8a649fb16334/app/assets/javascripts/custom-tooltip.js?at=v1_stable"
             class="aui-button aui-style pjax-trigger" aria-pressed="true">
            Source
          </a>
          <a href="/ufohunterscom/ufohunters-site/diff/app/assets/javascripts/custom-tooltip.js?diff2=8a649fb16334&at=v1_stable"
             class="aui-button aui-style pjax-trigger"
             title="Diff to previous change">
            Diff
          </a>
          <a href="/ufohunterscom/ufohunters-site/history-node/8a649fb16334/app/assets/javascripts/custom-tooltip.js?at=v1_stable"
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
          
        
      
    
      
        
          <span>custom-tooltip.js</span>
        
      
    
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
         data-path="app/assets/javascripts/custom-tooltip.js"
         data-source-url="/api/1.0/repositories/ufohunterscom/ufohunters-site/src/8a649fb16334e69774ce4b35aae30c2be31469f5/app/assets/javascripts/custom-tooltip.js">
      <div id="source-view" data-modules="repo/source/view-file">
        <div class="toolbar">
          <div class="primary">
            <div class="aui-buttons">
              
                <button id="file-history-trigger" class="aui-button aui-style changeset-info"
                        data-changeset="8a649fb16334e69774ce4b35aae30c2be31469f5"
                        data-path="app/assets/javascripts/custom-tooltip.js"
                        data-current="8a649fb16334e69774ce4b35aae30c2be31469f5">
                  
                     

<img class="avatar avatar16" src="https://secure.gravatar.com/avatar/ba8b3f8bd944706720b622d0147ea3ba?d=https%3A%2F%2Fd3oaxc4q5k2d6q.cloudfront.net%2Fm%2F4f5da60499c6%2Fimg%2Fdefault_avatar%2F16%2Fuser_blue.png&amp;s=16" alt="José Carlos García avatar" />
<span class="changeset-hash">8a649fb</span>
<time datetime="2014-01-15T22:39:26+00:00" class="timestamp"></time>
<span class="aui-icon-dropdown"></span>

                  
                </button>
              
            </div>
          <a href="/ufohunterscom/ufohunters-site/full-commit/8a649fb16334/app/assets/javascripts/custom-tooltip.js" id="full-commit-link"
              title="View full commit 8a649fb">Full commit</a>
          </div>
            <div class="secondary">
              <div class="aui-buttons">
                
                  <a href="/ufohunterscom/ufohunters-site/annotate/8a649fb16334e69774ce4b35aae30c2be31469f5/app/assets/javascripts/custom-tooltip.js?at=v1_stable"
                  class="aui-button aui-style pjax-trigger">Blame</a>
                
                
                <a href="/ufohunterscom/ufohunters-site/raw/8a649fb16334e69774ce4b35aae30c2be31469f5/app/assets/javascripts/custom-tooltip.js"
                  class="aui-button aui-style">Raw</a>
              </div>
              
                <div class="aui-buttons">
                  
                  <button class="edit-button aui-button aui-style">Edit</button>
                </div>
              
            </div>
          <div class="clearfix"></div>
        </div>

        
          
            
              
                <div class="file-source">
                  <table class="highlighttable"><tr><td class="linenos"><div class="linenodiv"><pre><a href="#cl-1"> 1</a>
<a href="#cl-2"> 2</a>
<a href="#cl-3"> 3</a>
<a href="#cl-4"> 4</a>
<a href="#cl-5"> 5</a>
<a href="#cl-6"> 6</a>
<a href="#cl-7"> 7</a>
<a href="#cl-8"> 8</a>
<a href="#cl-9"> 9</a>
<a href="#cl-10">10</a>
<a href="#cl-11">11</a>
<a href="#cl-12">12</a>
<a href="#cl-13">13</a>
<a href="#cl-14">14</a>
<a href="#cl-15">15</a>
<a href="#cl-16">16</a>
<a href="#cl-17">17</a>
<a href="#cl-18">18</a>
<a href="#cl-19">19</a>
<a href="#cl-20">20</a>
<a href="#cl-21">21</a>
<a href="#cl-22">22</a>
<a href="#cl-23">23</a>
<a href="#cl-24">24</a>
<a href="#cl-25">25</a>
<a href="#cl-26">26</a>
<a href="#cl-27">27</a>
<a href="#cl-28">28</a>
<a href="#cl-29">29</a>
<a href="#cl-30">30</a>
<a href="#cl-31">31</a>
<a href="#cl-32">32</a>
<a href="#cl-33">33</a>
<a href="#cl-34">34</a>
<a href="#cl-35">35</a>
<a href="#cl-36">36</a>
<a href="#cl-37">37</a>
<a href="#cl-38">38</a>
<a href="#cl-39">39</a>
<a href="#cl-40">40</a>
<a href="#cl-41">41</a>
<a href="#cl-42">42</a>
<a href="#cl-43">43</a>
<a href="#cl-44">44</a>
<a href="#cl-45">45</a>
<a href="#cl-46">46</a>
<a href="#cl-47">47</a>
<a href="#cl-48">48</a>
<a href="#cl-49">49</a>
<a href="#cl-50">50</a>
<a href="#cl-51">51</a></pre></div></td><td class="code"><div class="highlight"><pre><a name="cl-1"></a><span class="cm">/**</span>
<a name="cl-2"></a><span class="cm"> * Modified from vlandham.github.com/vis/gates/js/CustomTooltip.js</span>
<a name="cl-3"></a><span class="cm"> */</span>
<a name="cl-4"></a><span class="kd">function</span> <span class="nx">CustomTooltip</span><span class="p">(</span> <span class="nx">tooltipId</span><span class="p">,</span> <span class="nx">width</span> <span class="p">)</span> <span class="p">{</span>
<a name="cl-5"></a>
<a name="cl-6"></a>    <span class="kd">var</span> <span class="nx">tooltipId</span> <span class="o">=</span> <span class="nx">tooltipId</span><span class="p">;</span>
<a name="cl-7"></a>    <span class="nx">$</span><span class="p">(</span><span class="s2">&quot;body&quot;</span><span class="p">).</span><span class="nx">append</span><span class="p">(</span><span class="s2">&quot;&lt;div class=&#39;tooltip&#39; id=&#39;&quot;</span> <span class="o">+</span> <span class="nx">tooltipId</span> <span class="o">+</span> <span class="s2">&quot;&#39;&gt;&lt;/div&gt;&quot;</span><span class="p">);</span>
<a name="cl-8"></a>
<a name="cl-9"></a>    <span class="kd">var</span> <span class="nx">tooltip</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="s1">&#39;#&#39;</span><span class="o">+</span><span class="nx">tooltipId</span><span class="p">);</span>
<a name="cl-10"></a>
<a name="cl-11"></a>    <span class="k">if</span><span class="p">(</span><span class="nx">width</span><span class="p">){</span>
<a name="cl-12"></a>        <span class="nx">tooltip</span><span class="p">.</span><span class="nx">css</span><span class="p">(</span><span class="s2">&quot;width&quot;</span><span class="p">,</span> <span class="nx">width</span><span class="p">);</span>
<a name="cl-13"></a>    <span class="p">}</span>
<a name="cl-14"></a>
<a name="cl-15"></a>    <span class="nx">tooltip</span><span class="p">.</span><span class="nx">on</span><span class="p">(</span><span class="s2">&quot;mouseleave&quot;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span> <span class="nx">hideTooltip</span><span class="p">();</span> <span class="p">});</span>
<a name="cl-16"></a>
<a name="cl-17"></a>    <span class="nx">hideTooltip</span><span class="p">();</span>
<a name="cl-18"></a>
<a name="cl-19"></a>    <span class="kd">function</span> <span class="nx">showTooltip</span><span class="p">(</span> <span class="nx">content</span><span class="p">,</span> <span class="nx">event</span> <span class="p">)</span> <span class="p">{</span>
<a name="cl-20"></a>        <span class="nx">tooltip</span>
<a name="cl-21"></a>            <span class="p">.</span><span class="nx">html</span><span class="p">(</span><span class="nx">content</span><span class="p">)</span>
<a name="cl-22"></a>            <span class="p">.</span><span class="nx">show</span><span class="p">();</span>
<a name="cl-23"></a>
<a name="cl-24"></a>        <span class="nx">updatePosition</span><span class="p">(</span><span class="nx">event</span><span class="p">);</span>
<a name="cl-25"></a>    <span class="p">}</span>
<a name="cl-26"></a>
<a name="cl-27"></a>    <span class="kd">function</span> <span class="nx">hideTooltip</span><span class="p">(){</span>
<a name="cl-28"></a>        <span class="nx">tooltip</span><span class="p">.</span><span class="nx">hide</span><span class="p">();</span>
<a name="cl-29"></a>    <span class="p">}</span>
<a name="cl-30"></a>
<a name="cl-31"></a>    <span class="kd">function</span> <span class="nx">updatePosition</span><span class="p">(</span> <span class="nx">event</span> <span class="p">)</span> <span class="p">{</span>
<a name="cl-32"></a>        <span class="kd">var</span> <span class="nx">xOffset</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span>
<a name="cl-33"></a>            <span class="nx">yOffset</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span>
<a name="cl-34"></a>            <span class="nx">ttw</span> <span class="o">=</span> <span class="nx">tooltip</span><span class="p">.</span><span class="nx">width</span><span class="p">(),</span>
<a name="cl-35"></a>            <span class="nx">tth</span> <span class="o">=</span> <span class="nx">tooltip</span><span class="p">.</span><span class="nx">height</span><span class="p">(),</span>
<a name="cl-36"></a>            <span class="nx">wscrY</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="nb">window</span><span class="p">).</span><span class="nx">scrollTop</span><span class="p">(),</span>
<a name="cl-37"></a>            <span class="nx">wscrX</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="nb">window</span><span class="p">).</span><span class="nx">scrollLeft</span><span class="p">(),</span>
<a name="cl-38"></a>            <span class="nx">curX</span> <span class="o">=</span> <span class="p">(</span><span class="nb">document</span><span class="p">.</span><span class="nx">all</span><span class="p">)</span> <span class="o">?</span> <span class="nx">event</span><span class="p">.</span><span class="nx">clientX</span> <span class="o">+</span> <span class="nx">wscrX</span> <span class="o">:</span> <span class="nx">event</span><span class="p">.</span><span class="nx">pageX</span><span class="p">,</span>
<a name="cl-39"></a>            <span class="nx">curY</span> <span class="o">=</span> <span class="p">(</span><span class="nb">document</span><span class="p">.</span><span class="nx">all</span><span class="p">)</span> <span class="o">?</span> <span class="nx">event</span><span class="p">.</span><span class="nx">clientY</span> <span class="o">+</span> <span class="nx">wscrY</span> <span class="o">:</span> <span class="nx">event</span><span class="p">.</span><span class="nx">pageY</span><span class="p">,</span>
<a name="cl-40"></a>            <span class="nx">ttleft</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">max</span><span class="p">(</span> <span class="p">((</span><span class="nx">curX</span> <span class="o">-</span> <span class="nx">wscrX</span> <span class="o">+</span> <span class="nx">xOffset</span><span class="o">*</span><span class="mi">2</span> <span class="o">+</span> <span class="nx">ttw</span><span class="p">)</span> <span class="o">&gt;</span> <span class="nx">$</span><span class="p">(</span><span class="nb">window</span><span class="p">).</span><span class="nx">width</span><span class="p">())</span> <span class="o">?</span> <span class="nx">curX</span> <span class="o">-</span> <span class="nx">ttw</span> <span class="o">-</span> <span class="nx">xOffset</span><span class="o">*</span><span class="mi">2</span> <span class="o">:</span> <span class="nx">curX</span> <span class="o">+</span> <span class="nx">xOffset</span><span class="p">,</span> <span class="nx">wscrX</span> <span class="o">+</span> <span class="nx">xOffset</span> <span class="p">),</span>
<a name="cl-41"></a>            <span class="nx">tttop</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">max</span><span class="p">(</span> <span class="p">((</span><span class="nx">curY</span> <span class="o">-</span> <span class="nx">wscrY</span> <span class="o">+</span> <span class="nx">yOffset</span><span class="o">*</span><span class="mi">2</span> <span class="o">+</span> <span class="nx">tth</span><span class="p">)</span> <span class="o">&gt;</span> <span class="nx">$</span><span class="p">(</span><span class="nb">window</span><span class="p">).</span><span class="nx">height</span><span class="p">())</span> <span class="o">?</span> <span class="nx">curY</span> <span class="o">-</span> <span class="nx">tth</span> <span class="o">-</span> <span class="nx">yOffset</span><span class="o">*</span><span class="mi">2</span> <span class="o">:</span> <span class="nx">curY</span> <span class="o">+</span> <span class="nx">yOffset</span><span class="p">,</span> <span class="nx">curY</span> <span class="o">+</span> <span class="nx">yOffset</span> <span class="p">);</span>
<a name="cl-42"></a>
<a name="cl-43"></a>        <span class="nx">tooltip</span><span class="p">.</span><span class="nx">css</span><span class="p">(</span><span class="s1">&#39;top&#39;</span><span class="p">,</span> <span class="nx">tttop</span> <span class="o">+</span> <span class="s1">&#39;px&#39;</span><span class="p">).</span><span class="nx">css</span><span class="p">(</span><span class="s1">&#39;left&#39;</span><span class="p">,</span> <span class="nx">ttleft</span> <span class="o">+</span> <span class="s1">&#39;px&#39;</span><span class="p">);</span>
<a name="cl-44"></a>    <span class="p">}</span>
<a name="cl-45"></a>
<a name="cl-46"></a>    <span class="k">return</span> <span class="p">{</span>
<a name="cl-47"></a>        <span class="nx">showTooltip</span><span class="o">:</span> <span class="nx">showTooltip</span><span class="p">,</span>
<a name="cl-48"></a>        <span class="nx">hideTooltip</span><span class="o">:</span> <span class="nx">hideTooltip</span><span class="p">,</span>
<a name="cl-49"></a>        <span class="nx">updatePosition</span><span class="o">:</span> <span class="nx">updatePosition</span>
<a name="cl-50"></a>    <span class="p">};</span>
<a name="cl-51"></a><span class="p">}</span>
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
                  <a class="pjax-trigger" href="/ufohunterscom/ufohunters-site/src/[[changeset]]/app/assets/javascripts/custom-tooltip.js?at=[[safeName]]"
                     title="[[name]]">
                    [[name]] ([[shortChangeset]])
                  </a>
                </li>
              [[/heads]]
            [[/hasMultipleHeads]]
            [[^hasMultipleHeads]]
              <li class="comprev filter-item">
                <a class="pjax-trigger" href="/ufohunterscom/ufohunters-site/src/[[changeset]]/app/assets/javascripts/custom-tooltip.js?at=[[safeName]]" title="[[name]]">
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
            <a class="pjax-trigger" href="/ufohunterscom/ufohunters-site/src/[[changeset]]/app/assets/javascripts/custom-tooltip.js?at=[[safeName]]" title="[[name]]">
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
           href="#">74882546d79b / 4f5da60499c6 @ app06</a>
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
<script type="text/javascript">if(!NREUMQ.f){NREUMQ.f=function(){NREUMQ.push(["load",new Date().getTime()]);var e=document.createElement("script");e.type="text/javascript";e.src=(("http:"===document.location.protocol)?"http:":"https:")+"//"+"js-agent.newrelic.com/nr-100.js";document.body.appendChild(e);if(NREUMQ.a)NREUMQ.a();};NREUMQ.a=window.onload;window.onload=NREUMQ.f;};NREUMQ.push(["nrfj","beacon-2.newrelic.com","a2cef8c3d3","1841284","Z11RZxdWW0cEVkYLDV4XdUYLVEFdClsdAAtEWkZQDlJBGgRFQhFMQl1DXFcZQ10AQkFYBFlUVlEXWEJHAA==",0,275,new Date().getTime(),"","","","",""]);</script></body>
</html>
