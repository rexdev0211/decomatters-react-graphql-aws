// import HelpCenter from '../../routes/HelpCenter'

const HelpCenterList = [
  {
    title: 'Getting Started',
    id: 'getting-started',
    show: 4,
    active: 1,
    subNav: [
      { title: 'What is Decormatters?', id: 'what-is-decormatters', active: 1 },
      { title: 'Tutorial', id: 'tutorial', active: 1 },
      { title: 'Is the app free to use?', id: 'free-to-use', active: 1 },
      { title: 'Find/Search for Users', id: 'find-user', active: 1 },
      { title: 'Follow', id: 'follow', active: 1 },
      { title: 'Block', id: 'block', active: 1 },
      { title: 'Comment', id: 'comment', active: 1 }
    ]
  },
  {
    title: 'Account',
    id: 'account',
    show: 4,
    active: 1,
    subNav: [
      { title: 'Create an Account', id: 'create-account', active: 1 },
      { title: 'Complete your account information', id: 'info', active: 1 },
      { title: 'Edit Avatar', id: 'edit-avatar', active: 1 },
      { title: 'Log In/Log Out', id: 'login', active: 1 },
      { title: 'Disable/Delete', id: 'delete', active: 1 },
      { title: 'Can I change the language of DecorMatters?', id: 'language', active: 1 },
      { title: 'Email', id: 'email', active: 1 },
      { title: 'Reset Password', id: 'reset-password', active: 1 },
      { title: 'Verify Account', id: 'verify-account', active: 1 },
      { title: 'Membership', id: 'membership', active: 1 }
    ]
  },
  {
    title: 'App Pages',
    id: 'apppages',
    show: 4,
    active: 1,
    subNav: [
      { title: 'Home Page', id: 'home', active: 1 },
      { title: 'Shop Page', id: 'shop', active: 1 },
      { title: 'Design Page', id: 'designpage', active: 1 },
      { title: 'Notifications', id: 'notifications', active: 1 },
      { title: 'Profile Page', id: 'profile', active: 1 }
    ]
  },
  {
    title: 'Challenge & Events',
    id: 'challenge-events',
    show: 2,
    active: 1,
    tabs: true,
    subNav: [
      {
        title: 'Challenges',
        id: 'Challenges',
        active: 1,
        scroll: false,
        subNav: [
          {
            title: 'What are challenges? (Definition, rules, rewards)',
            id: 'what-challenges',
            active: 1,
            scroll: false
          },
          { title: 'Where do I find Challenges?', id: 'find-challenges', active: 1 },
          { title: 'How do I enter a challenge?', id: 'enter-challenges', active: 1 },
          { title: 'What do I get from doing challenges?', id: 'reward-challenges', active: 1 },
          { title: 'What does the 10% rule of challenge mean?', id: 'ten-percent', active: 1 },
          { title: 'What are challenge requirements?', id: 'challenge-requirements', active: 1 },
          {
            title: 'How to find the challenge requirements?',
            id: 'find-challenge-requirements',
            active: 1
          },
          // {
          //   title: 'What are the guidelines for design challenges?',
          //   id: 'guideline-challenges',
          //   active: 0
          // },
          { title: 'What are the deadlines for challenges?', id: 'deadline-challenges', active: 1 },
          { title: 'When are challenges live?', id: 'live-challenges', active: 1 },
          {
            title: 'How can I be notified of when challenges become live?',
            id: 'notified-challenges',
            active: 1
          },
          {
            title: 'Vote For Your Favorite',
            id: 'vote-favorite',
            active: 1
          }
        ]
      },
      {
        title: 'Events',
        id: 'Events',
        active: 1,
        scroll: false,
        subNav: [
          { title: 'What are events?', id: 'what-events', active: 1, scroll: false },
          { title: 'How do I enter an event?', id: 'enter-events', active: 1 },
          { title: 'What do I get from doing events?', id: 'reward-events', active: 1 },
          { title: 'What are the deadlines for events?', id: 'deadline-events', active: 1 },
          {
            title: 'How can I be notified of when events become live?',
            id: 'live-events',
            active: 1
          }
        ]
      }
    ]
  },
  {
    title: 'Design',
    id: 'designing',
    show: 3,
    active: 1,
    tabs: true,
    subNav: [
      {
        title: 'Start Designing',
        id: 'start-designing',
        subNav: [
          {
            title: 'Where do I start designing?',
            id: 'how-to-start-designing',
            active: 1,
            scroll: false
          },
          { title: 'Can I upload my own templates?', id: 'upload-own-templates', active: 1 },
          { title: 'What are bubbles on the template?', id: 'bubbles', active: 1 },
          { title: 'What does Dcoin number mean', id: 'dcoin-meaning', active: 1 },
          {
            title: 'What does the white price tag on the items mean?',
            id: 'white-price-tags',
            active: 1
          },
          { title: 'Catalog', id: 'catalog', active: 1 },
          { title: 'Wishlist', id: 'wishlist', active: 1 },
          { title: 'MyDecor', id: 'mydecor', active: 1 },
          { title: 'Inventory', id: 'inventory', active: 1 },
          {
            title: 'Where can I get inspiration making designs?',
            id: 'design-inspirations',
            active: 1
          }
        ]
      },
      {
        title: 'Editing Designs',
        id: 'editing-designs',
        subNav: [
          // { title: 'Coming Soon', active: 0 }
          { title: 'How do I resize an item?', id: 'resize-item', active: 1, scroll: false },
          { title: 'How do I rotate an item?', id: 'rotate-item', active: 1 },
          // { title: 'How to get higher quality items?', id: 'higher-quality-items', active: 1 },
          { title: 'How do I add my own items?', id: 'add-own-items', active: 1 },
          { title: 'How do I save progress before I publish it?', id: 'save-progress', active: 1 },
          { title: 'Where can I find my design drafts', id: 'find-design-drafts', active: 1 },
          { title: 'How do I delete drafts?', id: 'delete-drafts', active: 1 },
          {
            title: 'How do I add effects like shadows and lighting?',
            id: 'add-effects',
            active: 1
          },
          { title: 'How do I change the wall or floor color', id: 'change-color', active: 1 }
        ]
      },
      {
        title: 'Design Tools',
        id: 'design-tools',
        subNav: [
          // { title: 'Coming Soon', active: 0 }
          { title: 'Angles', id: 'angles', active: 1, scroll: false },
          { title: 'Delete', id: 'delete', active: 1 },
          { title: 'Flip', id: 'flip', active: 1 },
          { title: 'Front/Back', id: 'front-back', active: 1 },
          { title: 'Edit', id: 'design-tool-edit', active: 1 },
          { title: 'Crop', id: 'crop', active: 1 },
          { title: 'Duplicate', id: 'duplicate', active: 1 },
          { title: 'Undo/Redo', id: 'undo-redo', active: 1 },
          { title: 'Lock/Unlock', id: 'lock-unlock', active: 1 },
          { title: 'Brightness', id: 'brightness', active: 1 },
          { title: 'Perspective', id: 'perspective', active: 1 }
        ]
      }
    ]
  },
  {
    title: 'Publishing Designs',
    id: 'publishing-designs',
    show: 3,
    active: 1,
    subNav: [
      { title: 'How Do I publish a design?', id: 'publish-design', active: 1 },
      {
        title:
          'How do I add a caption before publishing my design? / Can I add hashtags # or mention other users in my captions?',
        id: 'caption-design',
        active: 1
      },
      {
        title: 'How can I modify my caption after I publish design',
        id: 'modify-caption',
        active: 1
      },
      { title: 'Can I add videos or GIFs in my posts?', id: 'add-gif', active: 1 },
      { title: 'How do I delete my designs/posts', id: 'delete-designs', active: 1 }
    ]
  },
  {
    title: 'Sharing & Exploring Designs',
    id: 'sharing-exploring',
    show: 3,
    active: 1,
    subNav: [
      {
        title: 'How do I share my designs to other platforms?',
        id: 'sharing-platforms',
        active: 1
      },
      { title: 'How do I save my designs to my phone?', id: 'save-designs-phone', active: 1 },
      { title: 'How do I like a design?', id: 'like-a-design', active: 1 },
      { title: 'How do I comment on a design?', id: 'comment-design', active: 1 },
      { title: "What can I do if i see a post I don't like?", id: 'dont-like', active: 1 },
      { title: 'How do I search for a specific design?', id: 'search-design', active: 1 },
      {
        title: 'How do I find similar items to the ones that other users used in their designs?',
        id: 'find-similar-items',
        active: 1
      },
      { title: 'What are gifts?', id: 'what-are-gifts', active: 1 },
      { title: 'How do I give gifts?', id: 'how-to-give-gifts', active: 1 },
      { title: 'What does it cost to give a gift to others?', id: 'cost-to-gift', active: 1 },
      { title: 'What do I get if I receive a gift?', id: 'receive-gift', active: 1 },
      {
        title: 'How do I know I received a gift?/ How to check my received gifts',
        id: 'check-received-gifts',
        active: 1
      }
    ]
  },
  {
    title: 'Rewards',
    id: 'rewards',
    show: 3,
    active: 1,
    subNav: [
      // { title: 'Gifts', id: 'gifts', active: 0 },
      { title: 'Dcoins', id: 'dcoins', active: 1 },
      { title: 'Badges', id: 'badges', active: 1 },
      { title: 'EXP', id: 'exp', active: 1 },
      { title: 'Daily Check-In Tasks', id: 'daily-check-in', active: 1 }
    ]
  },
  {
    title: 'My Decor',
    id: 'mydecor',
    show: 3,
    active: 0,
    subNav: [
      { title: 'What Is MyDecor?', id: 'what-is-mydecor', active: 0 },
      { title: 'Do I need to pay for MyDecor?', id: 'do-i-need-to-pay-for-mydecor', active: 0 },
      { title: 'What is Marketplace?', id: 'what-is-marketplace', active: 0 },
      {
        title: 'How do I find a specific decoration/ furniture among Marketplace items?',
        id: 'find'
      },
      { title: 'How do I create my own items?', id: 'create-items' },
      { title: 'How do I delete items from my image stock?', id: 'delete-items' },
      {
        title: 'Why are the MyDecor items locked when I am designing?',
        id: 'lock-items',
        active: 0
      },
      { title: 'How do I edit the MyDecor items that I uploaded?', id: 'edit-mydecor-items' },
      {
        title: 'How do I get more MyDecor image stocks?/ How to upgrade my MyDecor plan?',
        id: 'more-items'
      },
      { title: 'How do I check or cancel my MyDecor plan?', id: 'cancel' }
    ]
  },
  {
    title: 'Contact Us',
    id: 'contact-us',
    show: 3,
    active: 1,
    subNav: [
      {
        title:
          'How do I contact DecorMatters? (Report, suggestion, Business Cooperation, apply for job ...)',
        id: 'contact',
        active: 1
      },
      { title: 'How do I review recent messages sent from DecorMatters?', id: 'review', active: 1 },
      { title: 'How to report a post?', id: 'report', active: 1 }
    ]
  }
]

exports.HelpCenterList = HelpCenterList

const challenges = (title, text, image_url) => {
  return (
    '<h3 style="margin-top:50px;">' +
    title +
    '</h3>' +
    '<div><p style="display:inline-block;width: 50%;padding:0; margin:0;">' +
    text +
    '</p>' +
    '<div style="float:right; text-align:center;margin-top:-15px; width: 50%;"><img style="max-width:100% ; height:140px " src="' +
    image_url +
    '"/></div>' +
    '</div>'
  )
}

const HelpCenterMarkupContent = {}
HelpCenterMarkupContent['default'] = '<h3>Coming Soon</h3>'
/* GETTING STARTED */
HelpCenterMarkupContent['what-is-decormatters'] =
  '<p>DecorMatters is a community that allows users enjoy a relaxing game of designing and decorating rooms. ' +
  'You can show of your creativity and skills, chat with other users from all over the world, and participate in many fun activities and challenges.</p>' +
  '<p>For any further questions, you can refer to our FAQ or contact us at <a href=mailto:help@decormatters.com>help@decormatters.com</a> if you require further assistance!</p>'

const getVideoLink = () => {
  //check if mobile
  return navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)
    ? '//didr9pubr8qfh.cloudfront.net/faq/tutorial-mobile.mp4'
    : '//didr9pubr8qfh.cloudfront.net/faq/tutorial.mp4'
}

const getPosterLink = () => {
  return navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)
    ? '//didr9pubr8qfh.cloudfront.net/faq/video-mobile.jpg'
    : ''
}

HelpCenterMarkupContent['tutorial'] =
  '<p><video height="500" width="100%" controls playsinline poster="' +
  getPosterLink() +
  '"><source src=' +
  getVideoLink() +
  ' type="video/mp4"/>Your browser does not support the video tag</video></p>'
// '<p><iframe title="vlog" width="100%" height="500" src="https://www.youtube.com/embed/UZX44BYM-WI?playsinline=1" frameborder="0" class="details_vlog__1JO6B">Your browser does not support the video tag.</iframe></p>'
// '<p>Complete a tutorial to learn more about the app. </p></br> ' +
// '<p>To find the tutorial, head to the \'Profile\' page <img style="vertical-align: middle;" src="https://didr9pubr8qfh.cloudfront.net/faq/image_4a+1.png" alt="profile"/></p>' +
// '<p>Click on settings in the top right corner <img style="vertical-align: middle;" src="https://didr9pubr8qfh.cloudfront.net/faq/image_4b+1.png" alt="settings"/></p>' +
// '<p>Find the tab labeled \'Tutorial\' <img style="vertical-align: middle;" src="https://didr9pubr8qfh.cloudfront.net/faq/image_4c+1.png" alt="tutorial"/></p>'

HelpCenterMarkupContent['free-to-use'] =
  '<p>Except for the Dcoin package purchases, all the pages and features are free to use.</p>' +
  '<p>You will not be charged unless you purchase Dcoins.</p>'

HelpCenterMarkupContent['find-user'] =
  '<h3>How do I search/find users?</h3><p>There are different ways to search or find people! </p>' +
  '<p>1) On Your <img style="vertical-align: middle;width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Account/image_4a.jpg" alt="profile"/> page, you can head to <b>Following</b> number on the top right and search for users by their usernames.</p>' +
  '<p>2) On the <img style="vertical-align: middle;width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/GetStarted/image_6b.jpg" alt="faq"/> page, there is also a search option on the right of <b>Inspiration</b> under the challenges carousel that you can also use to look for people!</p>'

HelpCenterMarkupContent['follow'] =
  '<h3>How to get more followers? </h3> ' +
  '<p>To get more followers, you can try to create and post designs more often, take part in our Challenges and Events, and interact more with other users. User interaction can include liking their designs, leaving positive comments and giving them gifts!</p>' +
  '<p>In addition, we collect great designs and then boost them on our Homepage every day. Therefore, users’ designs will gain more exposure and likes. So, keep up with your high quality designs!</p>' +
  '<h3>How do I look at the users who are following me and those that I follow?</h3>' +
  "<p>If you want to see who is following you or who you are following, head to your 'Profile' page and click on the 'Followers' number on the top to see who is following you or the 'Following' number on the top right to see who you are following.</p>" +
  '<h3>How do I unfollow someone on Decormatters?</h3>' +
  "<p>You can unfollow a user by heading to their profile and hitting the 'Following' button which will unfollow them and change the status of the button to 'Follow'.</p>"

HelpCenterMarkupContent['block'] =
  '<h3>How do I block or unblock someone?</h3> ' +
  "<p>You can block users by heading to their profile, hitting the three dots on the top right of user's profile page, and selecting 'Block'. From there, confirm that you would like to block the user.\n" +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%;height:auto " src="https://decormatters-prod.s3-us-west-1.amazonaws.com/faq/v2/GetStarted/Block1.png" alt="block"/></div>' +
  'To unblock a user, you will need to go to their profile page by looking up their username. From there, you can chose to unblock the user. \n' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://decormatters-prod.s3-us-west-1.amazonaws.com/faq/v2/GetStarted/Block2.png" alt="unblock"/></div>' +
  'Remember that you can block/unblock users at anytime.</p>'

HelpCenterMarkupContent['comment'] =
  "<h3>How do I delete someone's comment?</h3> " +
  "<p>You can only delete comments from your own posts or your comments on someone else's posts. To delete a comment, simply swipe right on the comment and hit the delete option. </p>" +
  '<div style="text-align:center;margin:20px 0;"><img style="max-width:100% ; height:auto " src="https://didr9pubr8qfh.cloudfront.net/faq/v2/GetStarted/Comment.png" alt="comment"/></div>'

/* GETTING STARTED */

/* CHALLENGES-CHALLENGES*/
HelpCenterMarkupContent['what-challenges'] =
  '<p>Challenges are there for you to join as an opportunity to practice and show off your design skills! From challenges you can the earn most rewards as well as the chance of being noticed by others and gain more followers. The more likes you get on your challenge designs, the higher your reward will be!\n' +
  '</p>' +
  '<p>Challenges have multiple types based on the design level, and harder challenges will offer more rewards. Right now, we have daily, regular, special, weekend, series, throwback, pop-up, new user, and pro challenges.</p>' +
  challenges(
    'Daily Challenges',
    'Daily challenges are there for users to participate in every day as a part of their daily routine. They are live for 24 hours and are meant to be completed quickly. You can earn 100 EXP and 50 Dcoins when you complete daily challenges on time.',
    'https://didr9pubr8qfh.cloudfront.net/faq/v2/Challenges/DailyChallenges.png'
  ) +
  challenges(
    'Classic Challenges',
    'Classic challenges are posted often and are live for 7 days. These give users the opportunity to earn badges, to earn 100 Dcoins and 100 EXP that are then shown off on their profile for other users to see. ',
    'https://didr9pubr8qfh.cloudfront.net/faq/v2/Challenges/ClassicChallenges.png'
  ) +
  challenges(
    'Special Challenges',
    'Special challenges happen during special times of the year like holidays or celebrations. These are rewarded with 100 EXP, 20 Dcoins, and their own unique badges when they are completed on time!',
    'https://didr9pubr8qfh.cloudfront.net/faq/v2/Challenges/SpecialChallenges.png'
  ) +
  challenges(
    'Weekend Challenges',
    'Weekend challenges go live during the weekends and they consist of two parts! Participants can earn 20 Dcoins and 100 EXP when the challenges end.',
    'https://didr9pubr8qfh.cloudfront.net/faq/v2/Challenges/WeekendChallenges.png'
  ) +
  challenges(
    'Pro Challenges',
    'Pro challenges are challenges that consist of a harder template meant to test your designs skils when it comes to angles and peculiar spaces! Participants can earn 100 EXP by finishing and publishing the designs on time and earn 120 Dcoins by having more than 60 likes when the challenges end.',
    'https://didr9pubr8qfh.cloudfront.net/faq/v2/Challenges/ProChallenges.png'
  ) +
  challenges(
    'Series Challenges',
    'Series challenges consists of 5 different challenges that are all related. Complete each one to earn 20 Dcoins and 100 EXP. Complete all 5 challenges on time to earn a special reward.',
    'https://didr9pubr8qfh.cloudfront.net/faq/v2/Challenges/SeriesChallenges.png'
  ) +
  challenges(
    'Throw Back Challenges',
    'Throwback challenges are where we bring back the challenges that users enjoyed the most and let you take another chance at showing of your skills! Earn 100 EXP for participating and the design with more than 60 likes will earn an additional 60 Dcoins!',
    'https://didr9pubr8qfh.cloudfront.net/faq/v2/Challenges/ThrowBackChallenges.png'
  ) +
  challenges(
    'New User Challenges',
    'New User challenges are targeted for our new users who are still learning how to use the app. It is the easiest type of challenge. These can be completed simply and quickly. Everyone is welcome to participate. You can earn 100 EXP and 100 Dcoins once the challenge has ended!',
    'https://didr9pubr8qfh.cloudfront.net/faq/v2/Challenges/NewUserChallenges.png'
  ) +
  challenges(
    'Pop-up Challenges',
    "Pop-up challenges go live at a random time and are only live few hours. An announcement will be sent each time before they go live so that you don't miss it. Pop-up challenges have the different rewards based on how long they are live for.",
    'https://didr9pubr8qfh.cloudfront.net/faq/v2/Challenges/Pop-upChallenges.png'
  ) +
  challenges(
    'Virtual Staging Challenges',
    'Virtual Staging Challenges are live once a week and they are a chance for you as a designer to stage a home that is on sale! Follow the theme given every week and remember to keep your designs realistic. For these challenges, the structure of the room can not be altered. Earn a special badge, 20 Dcoins, 100 EXP and an extra 100 Dcoins if you are one of the featured users for that challenge.',
    'https://didr9pubr8qfh.cloudfront.net/faq/v2/Challenges/Pop-upChallenges.png'
  )

HelpCenterMarkupContent['enter-challenges'] =
  "<p>To enter a challenge, select the challenge that you would like to enter from the <b>'Challenges'</b> section under the <b>'Home'</b> or <b>'Design'</b> page and hit <b>'Join'</b></p>"

HelpCenterMarkupContent['find-challenges'] =
  '<p>There are two ways to find challenges that you can join! \n</p>' +
  '<p>1. By clicking on the <img style="vertical-align: middle;width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/GetStarted/image_6b.jpg" alt="faq"/> icon on the bottom of your screen. This will take you to a page where you can see all of the challenges that are live and join.\n</p>' +
  '</p>2. From the <img style="vertical-align: middle;width: 30px;height:30px;" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Challenges/image_68a.jpg" alt="compose"/> page, you can also find the \'Challenges\' section at the top where you can also quickly join challenges to create designs.\n</p>' +
  '<p>Select a challenge to see the detail page, and click the <img style="vertical-align: middle;width:100px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Challenges/image_68b.jpg" alt="joinnow"/> to participate in. </p>'

HelpCenterMarkupContent['reward-challenges'] =
  '<p>Joining a challenge gives you different rewards depending on the challenge. The rewards can include badges, Dcoins, EXP, and more. You can find the specifics for each challenge in its description.</p>'
HelpCenterMarkupContent['ten-percent'] =
  '<p>The challenge guideline is making sure that at least 10% of the original template is visible to stay within the guidelines. Publish before time runs out!</p>' +
  '<p>The 10% rule is in place on challenges only as effort to keep users from plagiarizing other work or cheating by uploading a completed design. This rule states that your design will not be allowed to be published by our system if less than 10% of the original template is showing. </p>'

HelpCenterMarkupContent['challenge-requirements'] =
  '<p>Challenge requirements are different tasks or items that need to be completed in the design in order for you to successfully publish. These can include requirements like using certain colors, brands, or staying within a certain budget. While designing, you can swipe down from the catalog section to view the requirements with their completion status. Only designs with completed requirements will be allowed to move on into publishing. Note that not all challenges have requirements.</p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Challenges/requirements.png" alt="requirements"/></div>'

HelpCenterMarkupContent['find-challenge-requirements'] =
  '<p>If a challenge has requirements, they will be shown when you first join the challenge. If while you are designing, you would like to be reminded of the requirements while you are designing, you can swipe down on the from the catalog page to view the requirements and their completion status.</p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Challenges/findrequirements.png" alt="requirements"/></div>'

HelpCenterMarkupContent['guideline-challenges'] =
  '<p>The challenge guideline is making sure that at least 10% of the original template is visible to stay within the guidelines. Publish before time runs out!\n' +
  'The 10% rule is in place on challenges only as effort to keep users from plagarizing other work or cheating by uploading a completed design. This rule states that your design will not be allowed to be published by our system if less than 10% of the original template is showing. </p>'

HelpCenterMarkupContent['deadline-challenges'] =
  '<p>Deadlines for challenges vary depending on the challenge type. Every challenge has a count down clock that shows how much time is left for that specific challenge. </p>'

HelpCenterMarkupContent['live-challenges'] =
  "<p>There are at least 2 new challenges daily and they are live at various times throughout the day! Make sure you enable the push notifications for <b>'New Challenges'</b> from the <b>'Notifications'</b> under the settings, and keep an eye out for when they become live to be the first one to participate in!</p>"

HelpCenterMarkupContent['notified-challenges'] =
  '<p>We send out notifications to let you know when a Challenge is live every time, so make sure that your notification are on if you want to be notified and kept up to date!\n</p>' +
  '<p>--> Go to <b>\'Profile\'</b> <img style="vertical-align: middle;width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Account/image_4a.jpg" alt="profile"/></p>' +
  '<p>--> Click <b>\'Settings\'</b> on the top right <img style="vertical-align: middle;width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Account/image_4b.jpg" alt="settings"/> </p>' +
  "<p>--> Click <b>'Notifications'</b> section</p>" +
  '<p>--> Enable the <b>New Challenges</b> to green </p>'

/* CHALLENGES-CHALLENGES*/
/* CHALLENGES-EVENT*/
HelpCenterMarkupContent['what-events'] =
  '<p>Events are posted by @decormattersdesign official account daily. Everyday will have at least one sometimes more new events. They are a chance for you to practice your design skills in whatever way you chose and earn more rewards. Some of these events can ask different things from users. This is a way to increase the level of particiapation in an effort to grow the community, so make sure you participate to gain friends and followers. These events can be categortized as Design Events, Q&A, and Topics, and more. Follow @decormattersdesign and participate in events anytime.</p>' +
  challenges(
    'Redesign Practice',
    'You can find design events under the official @decormattersdesign account with the Event icon on the top left of each post. Design Events are posted daily for you to continue leveling up and practicing your skills. There are guidelines given for you to follow if you choose. Make sure you add the corresponding hashtags and then tag us in the comments when you are done so that we can see those beautiful designs! ',
    'https://didr9pubr8qfh.cloudfront.net/faq/v2/Events/DesignEvents-v2.png'
  ) +
  challenges(
    'Super Topic',
    'Super Topics are events where we invite the community to join us in discussion on the latest trends, design tips, and much more! This is your time to ask for feedback from other designers or share tips and tricks. Prompts will be published every Monday, Wednesday and Friday for users to participate in.',
    'https://didr9pubr8qfh.cloudfront.net/faq/v2/Events/Q%26A.png'
  ) +
  // challenges(
  //   'Q&A',
  //   "You can find Q&A Events under the official @decormattersdesign account with the Q&A icon on the top left of each post. Q&A's are moments where the community comes together to share design tips, tricks and more! Make sure that you participate in the comments and interact with others in the community to learn more about those around you and learn new things along the way!",
  //   'https://didr9pubr8qfh.cloudfront.net/faq/Challenge/Events/Q%26A.png'
  // ) +
  challenges(
    '3 Best Designs',
    'You can find "3 Best Designs" Events under the official @decormattersdesign account with the "Your 3 Best Designs" title on the post. 3 Best Designs are an opportuunity for you as a designer to show of your skills by selcting your top 3 designs of that week and giving them the recognition that they deserve! Make sure you show your best as you could be a featured desiger based on this event!',
    'https://didr9pubr8qfh.cloudfront.net/faq/v2/Events/3BestDesigns.png'
  )

HelpCenterMarkupContent['enter-events'] =
  "<p>To participate in a design event, head to the 'Home' page, </p>" +
  '<p>--> Click the event posted by @decormattersdesign</p>' +
  "<p>--> Click 'Redesign'</p>" +
  '<p>From here, you will be able to design the room in whatever way you would like and we even provide a couple of objects as inspiration!</p>' +
  '<br/>' +
  "<p>To participate in a discussion event, such as Q&A, head to the 'Home' page, </p>" +
  '<p>--> Click the event posted by @decormattersdesign </p>' +
  '<p>--> Click the comment icon under the post</p>' +
  '<p>Then share your thoughts and chat with others.</p>' +
  '<br/>' +
  "<p>You also can visit the @decormattersdesign profile by click the profile photo from 'Home' page or searching for the username to see all posted events and participate.</p>"

HelpCenterMarkupContent['reward-events'] =
  '<p>You earn more EXP every time you complete an event! This will help you level up faster and get you even more rewards! Also, you will have a greater chance to be featured on the Home page. Some events have the coins reward for participants.</p>'
exports.HelpCenterMarkupContent = HelpCenterMarkupContent

HelpCenterMarkupContent['deadline-events'] =
  '<p>There are no deadlines for events, but earlier you participate the greater your chance will be of being noticed by other users to get more likes, comments, or followers. Feel free to enter them and complete them whever you would like!</p>'

HelpCenterMarkupContent['live-events'] =
  "<p>Make sure that your notifications for <b>'Events & Announcements'</b> are on! This will notify you of events and any important announcements that are posted on the official @decormattersdesign account!</p>" +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Events/Notifications.png" alt="notify"/></div>'

/* CHALLENGES-EVENT*/

/* Challenges-event-vote */
HelpCenterMarkupContent['vote-favorite'] =
  '<h3>What is Vote For Your Favorite</h3>' +
  '<p>Vote for Your Favorite is a weekly anonymous voting event in which users vote for their favorite 3 designs. The 3 designs that earn the most votes will become the winners of the event and will be featured on the Home Page.</p>' +
  '<div style="text-align:center;margin:20px 0;"><img style="max-width:100% ; height:auto " src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Vote/Vote.png" alt="vote"/></div>' +
  '<h3>How To Vote For Designs</h3>' +
  '<p>You can vote by opening the voting message, tapping on any design in the message, and choosing the 3 designs that you like the most.</p>' +
  '<div style="text-align:center;margin:20px 0;"><img style="max-width:100% ; height:auto " src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Vote/Howtovote.png" alt="how-vote"/></div>' +
  '<h3>How To Become a candidate</h3>' +
  '<p>To become a candidate, you can take part in the Redesign Practice every Tuesday and the Special challenges that are live every Friday.</p>'

/* END Challenges event vote */

/* Account */
HelpCenterMarkupContent['create-account'] =
  '<p>In order to create an account, head over to the <b>Profile</b> tab <img style="vertical-align: middle;width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Account/image_4a.jpg" alt="profile"/></p>' +
  '<p>--> Hit the settings button <img style="vertical-align: middle;width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Account/image_4b.jpg" alt="settings"/> </p>' +
  '<p>--> Click on <b>Sign up or Log in</b> <img style="vertical-align: middle;width:120px;height:30px;" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Account/image_12c.jpg" alt="signup"/></p>' +
  '<p>--> Select your preferred sign up method</p>' +
  '<p>--> If using your email, enter in your email and password and then hit ‘Sign Up’ to create your account. <img style="vertical-align: middle;width:140px;height:40px;object-fit:scale-down" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Account/image_12d.jpg" alt="signup"/></p>' +
  '<p>--> Or sign up using Google, Facebook, or Apple <img style="vertical-align: middle;width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Account/image_12e.jpg" alt="google"/> <img style="vertical-align: middle;width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Account/image_12f.jpg" alt="fb"/> <img style="vertical-align: middle;width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Account/image_12g.jpg" alt="apple"/></p>'

HelpCenterMarkupContent['info'] =
  '<p>You can complete your account information by going to the <b>Profile</b> tab <img style="vertical-align: middle;width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Account/image_4a.jpg" alt="profile"/></p>' +
  '<p>--> Hitting the settings button on the top right. <img style="vertical-align: middle;width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Account/image_4b.jpg" alt="settings"/></p>' +
  '<p>--> From there you can complete or update your username, email address, profile picture and about me. </p>' +
  '<br/>' +
  '<p>Keep in mind that each time changing your email address means that you will need to verify that email address again.</p>'

HelpCenterMarkupContent['edit-avatar'] =
  "<p>We have prepared different Avatars and Accessories for you to use. You can tap on your profile image on the 'Profile Page' to open the Avatar editing page where you can customize your Avatar</p>" +
  '<div style="text-align:center;margin:20px 0;"><img style="max-width:100% ; height:auto " src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Account/EditAvatar.png" alt="editavatar"/></div>'

HelpCenterMarkupContent['login'] =
  '<h3>How do I log back into DecorMatters?</h3>' +
  '<p>If you already have an existing account, head to the <b>Profile</b> <img style="vertical-align: middle;width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Account/image_4a.jpg" alt="profile"/> page ,</p>' +
  '<p> click on the <b>settings button</b> <img style="vertical-align: middle;width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Account/image_4b.jpg" alt="settings"/></p> located on the top right. Scroll down and find the <b>Sign Up or Log In</b> <img style="vertical-align: middle;width:120px;height:30px;" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Account/image_12c.jpg" alt="signup"/> tab.</p>' +
  '<p> Select <b>Log In</b> at the bottom and make sure you log back in through the same form that you used to create your account (ex. email, Facebook, or Google)</p>' +
  '<div style="text-align:center;margin:20px 0;"><img style="max-width:100% ; height:auto " src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Account/Login-logout.png" alt="loginlogout"/></div>' +
  '<h3>How do I log out of DecorMatters?</h3>' +
  '<p>To log out of your account, head to your <b>Profile</b> <img style="vertical-align: middle;width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Account/image_4a.jpg" alt="profile"/>, click on the <b>settings button</b> <img style="vertical-align: middle;width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Account/image_4b.jpg" alt="settings"/> located on the top right. Scroll down and find the <b>Log Out</b><img style="vertical-align: middle;width:80px;height:40px;object-fit:scale-down" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Account/image_15c.jpg" alt="logout"/> tab. Click and confirm that you would like to log out. </p>' +
  '<h3>Trouble logging in?</h3>' +
  "<p>If you can't log in, please double check that the email address or password are correct. Reset your password, if you forgot the existing one. Please also make sure that you are logging in through the same form that you used to create your account (ex. Facebook, Google, Apple, etc.)  </p>" +
  '<p>If you still cannot login back after these, please contact us for further assistance.</p>'

HelpCenterMarkupContent['delete'] =
  '<h3>How do I temporarily disable my account?</h3>' +
  '<p>To temporarily disable your DecorMatters account you can simply delete the app from your phone, this will pause all notifications and information from us until you are ready to come back. You will be able to come back to your account just as you left it. </p>' +
  '<br/><h3>How do I delete my DecorMatters account?</h3>' +
  '<p>To delete your DecorMatters account, you will need to send a request to us. We will confirm that you want to delete the account and then send a request to the engineers. From here you can delete the app. </p>'

HelpCenterMarkupContent['language'] =
  '<p>As of right now, the only language supported is English, but we are working on hopefully supporting other languages soon! </p>'

HelpCenterMarkupContent['email'] =
  '<h3>What do I do if I forget my email address or it is not available anymore?</h3>' +
  '<p>If you forget your email address but you know your username, please contact us so that we can further help.</p>' +
  '<p>If your email is no longer active, you will still be able to log into your account with DecorMatters, but you will not be able to verify your email if neeeded or reset your password.</p>'

HelpCenterMarkupContent['reset-password'] =
  '<p>If you forget your password or need to reset it, you can choose to reset your password. Simply head to the <b>Sign Up or Log In</b>  page, enter your email and select <b>Forgot Password</b>.</p>' +
  '<div style="text-align:center;margin:20px 0;"><img style="max-width:100% ; height:400px ;object-fit:scale-down;" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Account/ResetPassword.jpg" alt="forget-password"/></div>'

HelpCenterMarkupContent['verify-account'] =
  '<p>To verify your account, you can request the verification email by attempting to join your first challenge. This will let you know that an email was sent to your inbox. Please head to your inbox and wait for the email. Make sure that you also check your Spam folder for the email. If any issues arise, please contact us for further assistance.</p>'

HelpCenterMarkupContent['membership'] =
  '<h3>What is a membership?</h3><p>With the membership, you will have free unlimited space to upload personal items, free unlimited usage of all premium items for designing, and a special badge that will be shown on your profile! We also now have different payment plan options, both monthly and yearly, in order to fit your lifestyle and needs!</p>' +
  '<div style="text-align:center;margin:20px 0;"><img style="max-width:100% ; height:400px ;object-fit:scale-down;" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Membership/what.png" alt="what-is-membership"/></div>' +
  '<h3>Where can I find my membership information?</h3><p>You can find the membership by following the instructions below:\n' +
  '\n' +
  'Go to your profile page > Tap on the yellow Dcoin icon > Tap on the Refill button\n' +
  '<div style="text-align:center;margin:0 0;"><img style="max-width:100% ; height:400px ;object-fit:scale-down;" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Membership/where.png" alt="where-refill-membership"/></div>' +
  'You can also see information about the memberships during your design process:\n' +
  'Start a design > Tap on the yellow Dcoins icon on the top of the page\n' +
  '\n' +
  'Note: Users who have an active old MyDecor Plan will not be able to see options for the new memberships until their current plan ends.</p>' +
  '<div style="text-align:center;margin:0;"><img style="max-width:100% ; height:400px ;object-fit:scale-down;" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Membership/where2.png" alt="where-plans-end-membership"/></div>' +
  '<h3>How do I purchase a membership?</h3><p>Go to your profile page > Tap on the yellow Dcoin icon > Tap on the Refill button > Select the plan that you like > Make the payment\n' +
  '\n' +
  'You can also buy the memberships during your design process:\n' +
  '\n' +
  'Start a design > Tap on the yellow Dcoins icon on the top of the page > Select the plan that you like > Make the payment</p>' +
  '<div style="text-align:center;margin:20px 0;"><img style="max-width:100% ; object-fit:scale-down;" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Membership/how1.png" alt="how-to-buy-membership"/></div>' +
  '<div style="text-align:center;margin:20px 0;"><img style="max-width:100% ; object-fit:scale-down;" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Membership/how2.png" alt="how-to-buy-two-membership"/></div>' +
  '<h3>How do I cancel my membership?</h3><p>You can cancel your membership any time following the instruction below:  \n' +
  'Go to Settings on your device > Tap on your Apple account name > Tap on Subscriptions > Find your DecorMatters Membership plan and cancel</p>'

/* Account */

/* Contact */
HelpCenterMarkupContent['contact'] =
  '<p>To contact DecorMatters, head to your <b>Profile</b> tab</p>' +
  '<p>--> Hit the settings button <img style="vertical-align: middle;width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Account/image_4b.jpg" alt="settings"/> </p> ' +
  '<p>--> Click on <b>Contact Us</b></p>' +
  '<p>You can also email us at <a href="mailto:help@decormatters.com">help@decormatters.com</a></p>'

HelpCenterMarkupContent['review'] =
  '<p>To review other DecorMatters messages, head to your profile, click on the setting button located on the top right. Scroll down and find the <b>Contact Us</b> tab. Here you will be able to send us a message as well as view all other messages from us!</p>'

HelpCenterMarkupContent['report'] =
  '<p>To report a post, click the 3 dots <img style="vertical-align: middle; width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/ContactUs/image_47a.jpg" alt="three-dots"/> on the top right of the post, and hit the <b style="color:red">Report</b>.</p>' +
  '<p>To report comment, slide the comment towards the left, and hit the <b style="color:red">Report</b>.</p>' +
  '<p>For other things, feel free to contact us and let us know.</p>'
/* Contact */

/* Rewards */
HelpCenterMarkupContent['dcoins'] =
  "<h3>What are the Dcoins for?</h3><p>Dcoins can be used to purchase more template spaces, to give gifts to other users' designs, or to donate to your friends and family! They are also used to purchase MyDecor uses as well as premium decors offered by us!</p>" +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Rewards/Dcoins1.png" alt="dcoins1"/></div>' +
  '<h3>How do I get more Dcoins?</h3><p>You can earn Dcoins by pariticipating in challenges that offer Dcoins as rewards.</p>' +
  '<p>You can also purchase Dcoin refills or earn extra Dcoins by referring others</p>' +
  "<p>to the app and watching ads. To do so, head to your 'Profile' page             and</p>" +
  '<p>click on the yellow Dcoins icon on the top right. This will take you to your</p>' +
  '<p>Dcoins history page. You can then make Dcoin purchases, refer friends to the app, or</p>' +
  '<p>watch ads.</p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Rewards/Dcoins2.png" alt="dcoins2"/></div>' +
  '<h3>Where can I see my Dcoins?</h3><p>You can see your Dcoins total on the top right of your <b>Profile</b>. Clicking the yellow Dcoins icon will take you to the Dcoin history page where you can see a more detailed view of your Dcoins, including recent transactions. </p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Rewards/Dcoins4.png" alt="dcoins4"/></div>' +
  "<h3>I purchased Dcoins but they are not showing up on my account</h3><p>Please know that if your payment still shows as 'pending', your Dcoins will not show up right away. They will load into your account after some time as the payment processes. Once the payment is approved, your Dcoins should be in you account. If they are not, please reach out to us for further assistance.</p>"

HelpCenterMarkupContent['badges'] =
  '<h3>What are badges?</h3><p>Badges are awarded when you complete different types of challenges, or complete a secret task. All badges have different requirements. Some badges can be earned all year long while others can very by season or special occassions! Visit your <b>Profile</b> page to see all badges. Tap the badges option at the top of your profile to view the badges by their rank.</p>' +
  '<h3>How do I collect more badges?</h3><p>You can collect badges by participating in challenges that have badges as a reward. Some badges require completing 4 of the same themed design while others are by seasons or special badges. Make sure that you have your notifications on for challenges to make sure that you are aware of when they go live.</p>' +
  '<h3>Where can I see my badges?</h3><p>The badges that you have earned are on your <b>Profile</b> in color. <img style="vertical-align: middle;width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Rewards/image_128a.jpg" alt="profile-color"/></p>' +
  '<p>Your progress on any badges that you are on your way to completing will also show.  <img style="vertical-align: middle;width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Rewards/image_128b.jpg" alt="progress"/></p>' +
  '<p>The colorless badges  <img style="vertical-align: middle;width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Rewards/image_128c.jpg" alt="colorless-badge"/> are the ones that you have yet to earn so make sure you keep your notifications on for challenges so that you know when they go live. </p>' +
  '<p>Tapping on the badges under the profile will give you a quick description on the badge and how to collect it.</p>' +
  '<p>Tapping on the  <img style="vertical-align: middle;margin: 0 -10px 0 -3px; width:110px;height:40px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Rewards/image_128d.jpg" alt="four-badges"/> on the right of your profile picture, that will take you to a detailed view of all badges..</p>'
HelpCenterMarkupContent['gifts'] =
  '<h3>What are gifts?</h3>' +
  "<p>A gift is a form of appreciation and support for other users' designs. </p>" +
  '<br/><h3>How do I give gifts?</h3><p>To give a user a gift, head to the design that you want to praise and click <img style="vertical-align: middle;" src="https://didr9pubr8qfh.cloudfront.net/faq/image_118+1.png" alt="gifts"/> Then you will have different levels of gifts that you can give to the designs. These gifts will show up on the design and a comment letting them know that you have given them a gift. </p>' +
  '<br/><h3>What does it cost to give gifts to others?</h3><p>Depending on the gift that you want to give, it will cost a various amount of Dcoins depending on the level.</p>' +
  "<br/><h3>What do I get if I receive a gift?</h3><p>When you receive a gift, the value of your gifts received total increases. This gives you a chance to make it onto the leaderboard for 'Top Gifts Value'</p>" +
  '<br/><h3>How do I know I recieved a gift? / How to check my recieved gifts?</h3><p>Each time you recieve a gift, you will recieve a push notification and an in-app notification to tell you who send which gift to which design. \n' +
  'Also, you can check the gift sent list by clicking the gift bar on the right bottom of each design.</p>'
HelpCenterMarkupContent['exp'] =
  '<h3>What is EXP? How do I get more EXP?</h3>' +
  '<p>EXP help you level up. All of your actions on the app reward you EXP, but you can earn more EXP by participating in challenges and official events! The more challenges you participate in, the faster you will be able to level up and earn even more rewards or get a chance to be on a leaderboard!</p>'

HelpCenterMarkupContent['daily-check-in'] =
  '<h3>What is Daily Check-In Tasks?</h3>' +
  "<p>By completing the Daily Check-In Tasks, you can earn more Dcoins and EXP and adapt yourself faster to the community. The tasks and rewards will update everyday. Don't forget to come back and claim them before the end of the day.</p>" +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Rewards/DailyCheck-In.png" alt="daily-check-in"/></div>'

/* Rewards */

/* MY DECOR */
HelpCenterMarkupContent['what-is-mydecor'] =
  '<p>MyDecor allows you to upload your own items into your designs to make them unique and stand out above the rest of the designs. You can also access high quality items that we have hand selected and are exclusive from the <b>Marketplace</b></p>' +
  '<p>Users have three free stock spaces that you can use freely to upload items or use items from the <b>Marketplace</b>.</p>' +
  '<p>If you find that you want to use more than three at a time, you will need to purchase a MyDecor Stock Subscription. Those vary in the amount of stock spaces you get and are paid yearly.</p>'

HelpCenterMarkupContent['do-i-need-to-pay-for-mydecor'] =
  '<p>Every user recieves three free MyDecor stocks to use whether you want to add marketplace items or your own items into your designs. If you would like to use more than three at a time, you will need to purchase a MyDecor Subscription plan to upgrade the amount of spaces that you want to have. Also you can delete the items on the free stocks to add new items. <b>Note</b>: If you delete the items, they will disappear from your unpublished design as well.</p>'

HelpCenterMarkupContent['what-is-marketplace'] =
  '<p>Marketplace is a section where we have high quality and exclusive items for you to use in your designs. You can find kitchen, fashion, food, pet, bath and more items there.</p>'

HelpCenterMarkupContent['lock-items'] =
  '<p>Your MyDecor items will lock after the renewal of your subscription if there happens to be an issue with the processing of a payment. Please contact us for further assistance.</p>'
/* MY DECOR*/

/*Navigation */
HelpCenterMarkupContent['home'] =
  '<h3>Featured</h3> <h5>Challenges</h5><p>This section is located on the top of the <b>Home</b> page and it shows the challenges that are available for you to participate in. Swipe right and left to view more live challenges, or click on <b>More</b> to view a full list.</p>' +
  '<h5>Inspirations</h5><p>On the <b>Home</b> page, you can find inspirations for your designs or your home as well as come across some amazing designers for you to follow. Here you will see the new events, offical posts, annoucements, featured user designs, and more. You can filter the content by designs, magazines, blogs, or use the search option to look up specific hashtags #, users, or design styles.</p>' +
  '<h3>Explore</h3><p>On the Explore page, you can see the designs of all users and categorize them by the time they are posted, by their popularity, or based on who you follow. You can also use the search option to look up specific hashtags #, users, or design styles</p>' +
  '<h3>Leaders</h3><h5>All-time Top Level</h5><p>This is an all-time leaderboard. Listed on this board are the top 100 highest level designers. Users are ranked by the level they are on and their progress towards the next level.</p>' +
  '<h5>All-time Top Gifted</h5><p>This is an all-time leaderboard. Listed on this board are the top 100 users who received highest total value of gifts.</p>' +
  '<h5>Monthly Top Influencers</h5><p>This is a monthly leaderboard. Listed on this board are the top 100 most influential designers in the past 30 days. Users are ranked by followers, likes, and comments received in those past 30 days. </p>' +
  '<h5>Monthly Top Gifted</h5><p>This is a monthly leaderboard. Listed on this board are the top 100 users who received highest total value of gift in the past 30 days.</p>' +
  '<h5>Monthly Top Badges</h5><p>This is a monthly leaderboard. Listed on this board are the top 100 users who collected most completed badges in the past 30 days.</p>' +
  '<h5>Monthly Top Votes</h5><p>This is a monthly leaderboard. Listed on this board are the top 100 users who received the highest votes on their challenge designs from the closed challenges in the past 30 days.</p>' +
  '<h5>New Users Top Level</h5><p>This is a new user leaderboard. Listed on this board are the top 100 highest level new designers who have signed up within the last 30 days. Users are ranked by the level they are on and their progress towards the next level.</p>' +
  '<h5>New Users Top Gifted</h5><p>This is a new user leaderboard. Listed on this board are the top 100 users who have received highest total value of gifts. These users have signed up within the past 30 days.</p>' +
  '<h5>New Users Top Votes</h5><p>This is a new user leaderboard. Listed on this board are the top 100 users who have received the highest votes on their challenge designs from the closed challenges. These users have signed up within the last 30 days.</p>' +
  '<h5>How do I get on the leaderboard?</h5><p>To get on a leaderboard, make sure that you are participating in all challenges, events, as well as creating your own designs and making them as beautiful as possible. Follow others and like their designs to gain followers and increase your chances of making it onto a leaderboard.</p>'

HelpCenterMarkupContent['shop'] =
  '<h3>What is the Shop Page?</h3><p>On the <b>Shop</b> page, you will be able to shop through the furniture/decor items by room, brand, and style categories. You can also search for a specific piece of furniture or decor using the search tool on the top. </p>' +
  '<h3>How do I buy furniture/decoration?</h3><p>To purchase items on DecorMatters for your home, </p>' +
  '<p>--> Go to the <b>Shop</b> page on the bottom bar. </p>' +
  '<p>--> Find products by <b>Room</b>, <b>Brand</b>, or <b>Style</b></p>' +
  '<p>--> Click the product that you want to buy and you will be redirected to the product website</p>' +
  '<p>--> Shop from there</p>' +
  "<p>You also can buy the products from yours or other users' designs,</p>" +
  '<p>--> Click the design from the <b>Home</b> page or on your <b>Profile</b> page</p>' +
  '<p>--> Click the product that you want to buy and you will be redirected to the product website</p>' +
  '<p>--> Shop from there</p>' +
  '<h3>Does DecorMatters take the resonsibility if there is an issue with a furniture/decor order?</h3><p>DecorMatters is not responsible for issues that occur with orders and shipments that are placed online through the brands that we partner with. If issues occur, please contact customer service for the corresponding brand. </p>'

HelpCenterMarkupContent['designpage'] =
  "<h3>What is the Design Page?</h3><p>The <b>Design</b> page is where you can start designing from. You can join the design challenges, choose the templates that you'd like to work on, or upload your own templates to design.</p>" +
  '<h3>Challenges</h3><p>Challenges are there for you to join as an opportunity to practice and show off your design skills! To learn more about each type of challenge, head to Challenges & Event > Challenges > What are Challenges?</p>' +
  '<h3>Template</h3><p>From here, you can choose a template that we provide to start your design. To learn more about templates, head to Challenges & Event > Templates.</p>' +
  '<h3>My Template</h3><p>From here, you can upload your own templates to start your design. To learn more about templates, head to Challenges & Event > Templates.</p>'

HelpCenterMarkupContent['notifications'] =
  '<h3>In-app notifications</h3>' +
  '<p>There are two pages for the in-app notifications.</p>' +
  '<p>Under <b>You</b> these notification are specifically tailored for you. Here you will see notifications when someone likes your designs, leaves you a comments or a gift, as well as the official notifications related to challenges and events. </p>' +
  '<p>Under <b>Following</b> these notifications are specifically to let you know when the users you follow have posted designs so that you can view the designs from this page directly and give them your love and support!</p>' +
  '<h3>How do I turn off/on push notifications?</h3><p>To turn push notifications on or off and control which notifications you want to receive when you are away from the app, head to your <b>Profile</b> page,</p>' +
  '<p>Click the <b>Settings</b> button located on the top right corner. </p>' +
  '<p>Find the tab labeled <b>Notifications</b> where you will be able to customize the notifications that you receive. </p>'

HelpCenterMarkupContent['profile'] =
  '<h3>Your Profile</h3><p>Here you will see things like your posts, badges, Dcoin status, followers, who you follow, drafts, as well as have access to the settings page and your Idea Book.</p>' +
  '<h3>Settings</h3><p>Click the <b>Settings</b> button on the top right of your <b>Profile</b> page. Under the settings page, you will be able to modify your profile image, username, email, and about me section. You can also find the tabs for <b>Tutorial</b>, <b>Contact Us</b>, <b>FAQ</b>, <b>Notifications</b>, <b>Terms of Use</b>, <b>Privacy Policy</b>, as well as the option to either <b>Log Out</b> or <b>Sign Up or Log In</b>. If you have an active MyDecor subscription a tab labeled <b>My Plans</b> will also be available to you.</p>' +
  '<h3>Idea Book (designs, magazines, products, b/vlogs, official posts)</h3><h4>How do I save products, designs from others, b/vlogs, magazines, or official posts?</h4><p>If you want to save content from others, click <img style="vertical-align: middle; width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/ContactUs/image_47a.jpg" alt="three-dots"/> on the top right corner of the content on the <b>Home</b> page <img style="vertical-align: middle;width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/Designing/Starting/image_6b.jpg" alt="homepage"/> and select <b>Save</b>.</p>' +
  "<h4>Where are the products, designs from others, b/vlogs, magazines, or official posts that I save?</h4><p>These are saved into your Idea Book which is located on the top left corner of your 'Profile' page indicated by a bookmark icon. Here you will find any saved/bookmarked items, designs, magazine posts or blog posts that you wanted to save to refer to later. You can also use the filter feature to narrow down your search and find the items you need quicker!</p>" +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:300px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/App+pages/ProfilePage1.png" alt="app-pages-profile"/></div>' +
  '<h4>How do I delete content (products, designs, magazines, b/vlogs, official posts) that I saved?</h4><p>There are multiple ways to remove your saved items. </p>' +
  '<p>The first is heading to your Idea Book by clicking the bookmark icon on the top left under your <b>Profile</b> page. From here you will see everything that you have saved. To remove items from the wishlist, tap on the item and unclick the <b>Saved</b> button at the top right. To remove a design, magazine, or b/vlog, tap on the design, select the three dots on the top right and select <b>Unsave</b>.</p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%;object-fit:scale-down" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/App+pages/ProfilePage2.png" alt="app-pages-unsave"/></div>' +
  '<p>You can also delete multiple items under one category all at once by clicking on the select option on the top right of the page.</p>' +
  '<p>While you are designing, you can also head to your wishlist tap on the pink bookmark to delete your saved items.</p>'

/*Navigation*/

/* Start Designing */
HelpCenterMarkupContent['how-to-start-designing'] =
  '<p>There are many ways to start creating your beautiful designs! </p>' +
  '<p>1. Click <img style="vertical-align: middle;width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/Designing/Starting/image_68a.jpg" alt="design-edit"/> on the bottom of your screen. This will take you to a page where you can join challenges from <b>Challenges</b>, create more designs from <b>Templates</b>, or choose/upload personal template from <b>My Templates</b> to design.</p>' +
  '<p>2. From the <img style="vertical-align: middle;width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/Designing/Starting/image_6b.jpg" alt="homepage"/> page, you can also find the \'Challenges\' section where you can also quickly join challenges to create designs.</p>' +
  '<p>3. Go to <img style="vertical-align: middle;width:150px;height:80px" src="https://didr9pubr8qfh.cloudfront.net/faq/Designing/Starting/image_54a.jpg" alt="logo"/>   official account to participate in events. Click on an event, and tap the <img style="padding:0; margin:0 -5px;vertical-align: middle;width:120px;height:60px" src="https://didr9pubr8qfh.cloudfront.net/faq/Designing/Starting/image_54b.jpg" alt="redesign"/>to start.</p>'

HelpCenterMarkupContent['upload-own-templates'] =
  '<p>To create your own template</p>' +
  '<p>--> Go to <b>Design</b> page <img style="vertical-align: middle;width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Starting/image_68a.jpg" alt="design-edit"/></p>' +
  '<p>--> Click \'+\' under \'My Templates\' <img style="vertical-align: middle;width:100px;height:30px;" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Starting/image_76a.jpg" alt="mytemplates"/></p>' +
  '<p>Each time you level up, you will have three new slots. However, you can use Dcoins to purchase more slots to create more personal templates.</p>'

HelpCenterMarkupContent['bubbles'] =
  '<p>Bubbles are meant to guide you while you are designing. Clicking on a bubble will take you to a filtered search in the shop of that specific item where you can select an item that attracts your attention and place it where you need it. </p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; object-fit:scale-down;" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Starting/StartingDesign1.png" alt="bubbles"/></div>'
HelpCenterMarkupContent['dcoin-meaning'] =
  '<p>This Dcoin amount is to let you know how many coins you have left to use. You can also tap on this number to access the Dcoin refill page in case you are looking to purchase more coins.</p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; object-fit:scale-down;" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Starting/StartingDesign2.png" alt="dcoins"/></div>'

HelpCenterMarkupContent['white-price-tags'] =
  '<p>The white price tag on the items means that you have yet to purchase the items with Dcoins. You will not be able to publish your design unless those items are removed or purchased for in-app use.</p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; object-fit:scale-down;" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Starting/StartingDesign3.png" alt="white-price-tag"/></div>'
HelpCenterMarkupContent['catalog'] =
  '<h3>What is the catalog?</h3><p>The catalog is a section where we have all of the items that you can use in your designs.</p>' +
  '<p>In this section you can see all of your purchased items under Purchased, and all items for you to use or explore in your designs under Shop.</p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; object-fit:scale-down;" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Starting/StartingDesign3.png" alt="catalog"/></div>' +
  "<h3>What does it mean when an item is 'Free'?</h3><p>Items that display a 'Free' price are there for you to use in an unlimited amount of designs while it is available.</p>" +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; object-fit:scale-down;" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Starting/StartingDesign4.png" alt="free"/></div>' +
  '<h3>What is the difference between free items and items with a cost?</h3><p>Items that are free are there for you to use in your designs an unlimited amount of times. Items that have a cost are our more high quality and exclusive items that are hand picked by our staff for you to buy by Dcoins to use in your designs, such as kitchen cabinets, electrical appliances, pets, architecture, fashion items and more.</p>' +
  '<h3>How do I use an item with a cost?</h3><p>These items are available for you to use when they are purchased with Dcoins. Once you purchase an item, you will be able to use that item in five times, and need to re-purchase after five times.</p>' +
  '<h3>What does the Limited Clock icon mean above the items?</h3><p>The Limited Clock icon is there for users who still have an active MyDecor plan. This means that these items will be avaliable for you to use without cost until your plan expires. </p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; object-fit:scale-down;" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Starting/StartingDesign5.png" alt="clock-limited"/></div>' +
  '<h3>What are filters and how do I use them? </h3><p>Filters are there to help you narrow down your search when you are looking for products to use for your designs. While designing, simply select a filter to help you find what you would like. This can be done by category, brand, color, or price.</p>' +
  '<h3>How do I find a specific decoration/ furniture?</h3><p>While designing, you can use the <img style="vertical-align: middle;" src="https://didr9pubr8qfh.cloudfront.net/faq/image_78a+1.png" alt="filter"/> to narrow down products into what you need or use the search function <img style="vertical-align: middle;" src="https://didr9pubr8qfh.cloudfront.net/faq/image_78b+1.png" alt="search"/>  to look for anything specific.</p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto;object-fit:scale-down;" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Starting/StartingDesign7.png" alt="filterimage"/></div>' +
  "<h3>Can I filter out only the items that are free to use? </h3><p>You can filter out the items that are free to use by clicking on the 'Shop' tab under the 'Catalog' section and selecting the 'Filter' option. Under the filter, you will see a tab labeled 'Shop', click this to find an option labeled 'Free to Use'. By turning this filter on, you will be able to only see the items that are free to use within the catalog.</p>" +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; object-fit:scale-down;" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Starting/StartingDesign8.png" alt="filter"/></div>'

HelpCenterMarkupContent['wishlist'] =
  '<h3>What is Wishlist?</h3><p>Wishlist collects all you saved products. You can easily to find your saved products from there to add to your design. To add an item to your whish list, simply select the book mark icon on the upper right corner of the item, then the item will appear in your wishlist for later use.</p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; object-fit:scale-down;" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Starting/StartingDesign9.png" alt="wishlist"/></div>' +
  '<h3>How do I delete items from my wishlist?</h3><p>To delete an item from your wishlist, simply click the pink bookmark and the item will no longer appear in your wishlist for later use.</p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; object-fit:scale-down;" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Starting/StartingDesign10.png" alt="delete-wishlist"/></div>' +
  "<h3>Where do I find the items that I saved while I am not designing?</h3><p>These are saved into your Idea Book which is located on the top left corner of your 'Profile' page indicated by a bookmark icon. Here you will find any saved/bookmarked items, designs, magazine posts or blog posts that you wanted to save to refer to later.</p>" +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; object-fit:scale-down;" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Starting/StartingDesign11.png" alt="design-wishlist"/></div>'

HelpCenterMarkupContent['mydecor'] =
  '<h3>What is MyDecor?</h3><p>MyDecor allows you to upload your own items into your designs to make them unique and stand out above the rest of the designs. When you upload an item, you will then be able to use it in designs 5 times after purchasing the item with Dcoins.</p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; object-fit:scale-down;" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Starting/StartingDesign12.png" alt="mydecor"/></div>' +
  '<h3>Do I need to pay for MyDecor?</h3><p>MyDecor is paid with in-app Dcoins that you earn from participating in challenges/events and level up.</p>' +
  '<p>You need to pay 50 Dcoins to unlock one MyDecor item for 5 uses. You will need to unlock the item once again with the same price for another 5 uses.</p>' +
  '<p>Note: After an unlocked item is used in a published design, the use of that item cannot be recovered even if you delete your published design. </p>' +
  '<h3>Where do I find MyDecor?</h3><p>You can find MyDecor while you are designing. Click on the drop down menu located near the bottom left of you template. Here you will see an option for MyDecor. Tap here to view your MyDecor Items, and to upload new ones.</p>'

HelpCenterMarkupContent['inventory'] =
  '<h3>What is Inventory ?</h3><p>You can click on inventory while you are designing to view the items that you have added to your design. From this page, you can also unlock your items with Dcoins.</p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; object-fit:scale-down;" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Starting/StartingDesign13.png" alt="inventory"/></div>' +
  '<h3>What does the Total Value in my inventory mean?</h3><p>This amount is the total value of all of the furniture that is currently being used in the design. This does not mean that you are actually paying for the furniture but can be useful if you are trying to design a real space and have a set budget. In the case that you set a budget for the design, this will be a reference point.</p>'

HelpCenterMarkupContent['design-inspirations'] =
  '<p>You can find inspirations on how to approach your designs by looking on the <b>Home</b> page <img style="vertical-align: middle;width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/GetStarted/image_6b.jpg" alt="faq"/>  under the \'Featured\' section. </p>' +
  '<p>You can also look through the <b>Explore</b> page to see designs that users are uploading! </p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; object-fit:scale-down;" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Starting/StartingDesign14.png" alt="inventory"/></div>'

HelpCenterMarkupContent['resize-item'] =
  '<p>There are two ways to resize an item</p>' +
  '<p>1. Tap the item and drag the corner point to the size that you desire</p>' +
  '<p>2. Tap on the item and take two fingers and pinch or pull on the item to the new size.</p>'

HelpCenterMarkupContent['rotate-item'] =
  '<p>To rotate an item, tap the item and take two fingers and rotate the item to the desired degree.</p>'

HelpCenterMarkupContent['add-own-items'] =
  "<p>To add in your own items, click on the 'Catalog' filter and select MyDecor. Once you are here, you can click the red plus icon to upload your own items to use in your designs. You can choose items from a browser, photo library, or camera. </p>" +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Editing/editing1.png" alt="add-item"/></div>'

HelpCenterMarkupContent['save-progress'] =
  '<p>To save your progress while you are designing, simply hit the arrow button on the top right and click the <b>Save & Exit</b> option to save your design as a draft on your <b>Profile</b> page. </p>' +
  '<p>You can also hit the back arrow on the top left and select <b>Save</b> when prompted.</p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Editing/edting2.png" alt="save-item"/></div>'

HelpCenterMarkupContent['find-design-drafts'] =
  '<p>You can find your design drafts in the <b>Drafts</b> under your <b>Profile</b> page.</p>' +
  '<p>Here you will see all unfinished designs where you can continue design and post, or delete them.</p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Editing/editing3.png" alt="design-draft"/></div>'

HelpCenterMarkupContent['delete-drafts'] =
  "<p>To delete your draft, head to your <b>Profile</b> page and click on the 'Drafts' tab. </p>" +
  "<p>Tap on the design that you would like to delete and click on the three dots button on the top right. Click the <span style='color:red:font-weight:bold'>Delete</span>.</p>" +
  '<p>Please know that once a design or draft is deleted, there is no way to recover it. Keep in mind that if you are trying to delete a draft for a challenge that is still live, you will have to wait until the challenge is over to delete</p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Editing/edting4.png" alt="delete-draft"/></div>'

HelpCenterMarkupContent['add-effects'] =
  '<p>To make your designs more realistic, you can add shadows and lights to your objects to mimic lighting effects that happen in real life. Also keep in mind perspective and the sizing of items!</p>' +
  '<br/><p>To find the effects, such as shadows or lighting</p>' +
  '<p>--> Go to <b>Catalog</b></p>' +
  '<p>--> Click <b>All</b></p>' +
  '<p>--> Find <b>Effect</b> and click on it</p>' +
  '<br/><p>Then you will see all the effects that you can apply to your designs.</p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Editing/edting5.png" alt="add-effects"/></div>'

HelpCenterMarkupContent['change-color'] =
  "<p>Adding a different color to the wall or flooring means uploading the color that you would like to incorporate. While designing, click the 'Catalog' filter and select 'MyDecor'. Click the '+' to upload an image with the color that you would like to use, adjust it so that it covers the wall, make sure it is the furtherest layer from the front and lock it to prevent it from moving! You can also do this with fun print images to add wallpaper to the walls!</p>" +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Editing/edting6.png" alt="change-colors"/></div>'
/* start designing */

/*Design Tools */
HelpCenterMarkupContent['angles'] =
  '<p><b>Angles</b> will allow you to change between the different angle options of that item if it has multiple angle images above the tool. </p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Tools/Angles.png" alt="angles"/></div>'
HelpCenterMarkupContent['delete'] =
  '<p><b>Delete</b> will get rid of the selected item from the design. You can also tap the ‘X’ on the lower left hand side of the selected item to delete it.</p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Tools/Delete.png" alt="delete"/></div>'
HelpCenterMarkupContent['flip'] =
  '<p><b>Flip</b> will flip the item across its vertical axis. </p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Tools/Flip.png" alt="flip"/></div>'
HelpCenterMarkupContent['front-back'] =
  '<p>The <b>Front</b> and <b>Back</b> tools will move the item into the order that you desire it by changing its position in the layers. </p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Tools/BacK.png" alt="frontBack"/></div>'

HelpCenterMarkupContent['design-tool-edit'] =
  '<p><b>Edit</b> can be used when you want to remove a specific portion of an item or to remove its background. Using finger to drawing the part you want to keep that blue parts on the editing page. Then click <img style="vertical-align: middle;" src="https://didr9pubr8qfh.cloudfront.net/faq/Designing/Tool/image_94a.png" alt="check"/>  to save it. You can <img style="vertical-align: middle;" src="https://didr9pubr8qfh.cloudfront.net/faq/Designing/Tool/image_94b.png" alt="erase"/> the parts that adding by mistake.</p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Tools/Edit.png" alt="edit"/></div>'
HelpCenterMarkupContent['crop'] =
  '<p><b>Crop</b> will allow you to crop an item to the section that you need. Drag the edge of the square on the cropping page to crop the item. Then click <span style="font-weight:bold;color:orange">Done</span> on the bottom.</p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Tools/Crop.png" alt="crop"/></div>'
HelpCenterMarkupContent['duplicate'] =
  '<p><b>Duplicate</b> will create a second copy of the selected item.</p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Tools/Duplicate.png" alt="duplicate"/></div>'
HelpCenterMarkupContent['undo-redo'] =
  '<p><b>Undo</b> and <b>Redo</b> can back to the previous or next steps of the design actions.</p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Tools/UndoRedo.png" alt="undoredo"/></div>'

HelpCenterMarkupContent['lock-unlock'] =
  '<p><b>Lock</b> will freeze an item in place to avoid moving it will designing. </p>' +
  '<p><b>Unlock</b> will free the item up again so you can move it.</p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Tools/Unlock.png" alt="lockunlock"/></div>'

HelpCenterMarkupContent['brightness'] =
  '<p><b>Brightness</b> will allow you to change how dark or bright you would like an item to appear by dragging the dot on the red line.</p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Tools/Brightness.png" alt="brightness"/></div>'

HelpCenterMarkupContent['perspective'] =
  '<p><b>Perspective</b> will allow you to change the perspective of the item to the angle that you chose by dragging the dots on the red lines.</p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Design_Tools/Perspective.png" alt="perspective"/></div>'

/*Design Tools*/

/* PUBLISH DESIGNS */
HelpCenterMarkupContent['publish-design'] =
  "<p>To publish a design, hit the arrow button when you finish your design, and you will be given a chance to add hashtags # and a caption. After this, hit on the 'Post' bottom and your design will be shared with the community for others to admire.</p>" +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Publishing/publish1.png" alt="publish-design"/></div>'
HelpCenterMarkupContent['caption-design'] =
  '<p>Once you are finished with your design, hit on the top right corner. This will bring you to the next page where you will be able to add a caption to your image before publishing. In the captions, you can add hashtags "#", or mention other users "@".\n' +
  'To add a hashtag to your post, simply add the hashtag # and different options will begin to show up. Challenges will automatically add designated # hashtags to the caption but feel free to add more!\n' +
  'To mention someone in your caption add the @ followed by their user name. </p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Publishing/publish2.png" alt="caption-design"/></div>'

HelpCenterMarkupContent['modify-caption'] =
  '<p>Unfortunately, as of right now, there is no way to modify a caption after the design is published.</p>'

HelpCenterMarkupContent['add-gif'] =
  '<p>Unfortunately, users can not share videos or GIFs in their posts.</p>'

HelpCenterMarkupContent['delete-designs'] =
  '<p>To delete a post, find the design that you would like to delete on your profile. </p>' +
  '<br/><p>--> Click the three dots on the top right</p>' +
  "<p>--> Click <b>'Delete Post'</b></p>" +
  "<p>--> Click <b>'Delete'</b></p>" +
  '<br/><p>Please note that you will not be able to recover a deleted design so make sure that you really do want to get rid of the design. All comments and likes will be deleted along with the post. If the post was a challenge post, you are still able to join again if it is still live.</p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Publishing/publish3.png" alt="delete-publish-design"/></div>'
/* publish DESIGNS */

/* sharing designs*/
HelpCenterMarkupContent['sharing-platforms'] =
  '<p>To share your designs to another platform</p>' +
  '<p>--> Click the three dots on the top right of your design</p>' +
  '<p>--> Click <b>Share</b></p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Sharing%26eExplore/1sharedesigns.png" alt="share-design"/></div>'

HelpCenterMarkupContent['save-designs-phone'] =
  "<p>To save a design to your phone's camera roll </p>" +
  '<p>--> Click the three dots on the top right of your design</p>' +
  '<p>--> Click <b>Share</b></p>' +
  '<p>--> Click <b>Save Image</b></p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Sharing%26eExplore/2sharedesigns.png" alt="save-design"/></div>'

HelpCenterMarkupContent['like-a-design'] =
  '<p>To like a post, simply tap the <img style="vertical-align: middle;width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Sharing%26eExplore/image_112.jpg" alt="like"/>  under the design to change it from white to red.</p>'

HelpCenterMarkupContent['comment-design'] =
  '<p>To comment on a design, click the <img style="vertical-align: middle;width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Sharing%26eExplore/image_113.jpg" alt="comment"/>  under the design and from there you will be able to read other user\'s comments or leave your own.</p>'

HelpCenterMarkupContent['dont-like'] =
  '<p>If you stumble across a post that is offensive to you or the community you can report the design. To do this, click the three dots on the top right and select <b>Report</b>. Once you confirm, the post will be reported to us. You can also screenshot the post and send it to us directly.</p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Sharing%26eExplore/3report.png" alt="report-design"/></div>'

HelpCenterMarkupContent['search-design'] =
  '<p>If you want to search for a specific design, you can look up designs by hashtags or users. To do so, click the <img style="vertical-align: middle;width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/GetStarted/image_6b.jpg" alt="faq"/> and look for a design.</p>'

HelpCenterMarkupContent['find-similar-items'] =
  '<p>If you see items in a design that stand out to you and would like to see similar items, tap on the design you like and you will see the detail page of the design. Tap on the little white price tag at the lower left corner of the design and you will see little white dots on the items in the design. Tap on the items that you are interested in and you will see the similar items.</p>' +
  '<p>Note: Not all items are eligible for this feature.</p>' +
  '<div style="text-align:center;margin:20px 0"><img style="max-width:100%; height:auto" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Sharing%26eExplore/4similar.png" alt="find-similar-design"/></div>'

HelpCenterMarkupContent['what-are-gifts'] =
  "<p>A gift is a form of appreciation and support for other users' designs. </p>"

HelpCenterMarkupContent['how-to-give-gifts'] =
  '<p>To give a user a gift, head to the design that you want to praise and click <img style="vertical-align: middle;width:30px;height:30px" src="https://didr9pubr8qfh.cloudfront.net/faq/v2/Sharing%26eExplore/image_118.jpg" alt="gifting-ico"/> . Then you will have different levels of gifts that you can give to the designs. These gifts will show up on the design and a comment letting them know that you have given them a gift. </p>'

HelpCenterMarkupContent['cost-to-gift'] =
  '<p>Depending on the gift that you want to give, it will cost a various amount of Dcoins depending on the level.</p>'
HelpCenterMarkupContent['receive-gift'] =
  "<p>When you receive a gift, the value of your gifts received total increases. This gives you a chance to make it onto the leaderboard for 'Top Gifts Value'</p>"
HelpCenterMarkupContent['check-received-gifts'] =
  '<p>Each time you receive a gift, you will receive a push notification and an in-app notification to tell you who send which gift to which design. </p>' +
  '<p>Also, you can check the gift sent list by clicking the gift bar on the right bottom of each design.</p>'

/*sharing designs*/
exports.HelpCenterMarkupContent = HelpCenterMarkupContent
