!function($){
	
	var chat = {

		/* region properties ----------------------------------------------- */

		/*
		 * @property: (object) chatEl
		 * get the .chat element
		 */
		chatEl: $('.chat'),

		/*
		 * @property: (object) loginEl
		 * get the form login element
		 */
		loginEl: $('.form-login'),

		/*
		 * @property: (object) realChatEl
		 * get the real chat element
		 */
		realChatEl: $('.real-chat'),

		/*
		 * @property: (object) messageFormEl
		 * get the message form element
		 */
		messageFormEl: $('.form-message'),

		/*
		 * @property: (object) chatBoxEl
		 * get the message form element
		 */
		chatBoxEl: $('.chat-box'),		

		/*
		 * @property: (object) statusEl
		 * get the status message element
		 */
		statusEl: $('.status'),

		/*
		 * @property: (string) name
		 * hold the user's name
		 */
		name: undefined,


		/* region methods -------------------------------------------------- */

		/*
		 * @method: init
		 */
		init: function() {

			var session = this.isSessionStarted();

			this.showChat();

			if ( session.status ) {
				this.name = session.name;
				this.enterChat();
			} else {				
				this.eventLogin();
			}

		},

		/*
		 * @method: isSessionStarted
		 * check if there is a session started on the page
		 */
		isSessionStarted: function() {

			return $.ajax({
				url: 'app/checksession.php',

				success: function( data ){
					
					var obj = eval('(' + data + ')');
					// console.log( obj );

					obj.status = ( obj.isset && obj.name !== undefined );

					return obj;
				}
			})
		},

		/*
		 * @method: showChat
		 * show the chat element
		 */
		showChat: function() {
			this.chatEl.fadeIn();
		},

		/*
		 * @method: eventLogin
		 * add event listener to .form-login
		 */
		eventLogin: function() {

			var that = this; // reference to chat object

			this.loginEl.on('submit', function(e){

				$.ajax({
					url: 'app/login.php',
					type: 'POST',
					data: $(this).serialize(),

					success: function( data ){
						
						var obj = eval('(' + data + ')');
						that.handleLogin( obj );
					}
				});

				e.preventDefault();
			});
		},

		/*
		 * @method: handleLogin
		 * @param: (object) loginObject
		 * handle the data returned from login.php
		 */
		handleLogin: function(loginObject) {
			
			if ( loginObject.status ) {

				this.name = loginObject.name;
				this.enterChat();
			} else {

				$('.status').text( loginObject.message );
			}
		},

		/*
		 * @method: enterChat
		 * remove form login and show the chat
		 */
		enterChat: function() {

			this.loginEl.remove();
			this.realChatEl.show();

			$('.welcome').html('Bem vindo <b>' + this.name + '</b>.');

			this.eventMessage();
			this.loadLog();
		},

		/*
		 * @method: eventMessage
		 * add event listener to message form
		 */
		eventMessage: function() {

			var that = this; // reference to chat object

			this.messageFormEl.on('submit', function(e){

				var ths = $(this),
					input = ths.find('input[type=text]'),
					message  = input.val();

				if ( message !== '' ) {
					$.ajax({
						url: 'app/post.php',
						type: 'POST',
						data: $(this).serialize(),

						success: function(){
							that.loadLog();
							input.val('');
						}
					});
				}
				
				e.preventDefault();
			});
		},

		/*
		 * @method: loadLog
		 * add event listener to message form
		 */
		loadLog: function() {

			var that = this; // reference to chat object

			$.ajax({
				url: 'log/log.html',
				cache: false,

				success: function( data ){
					console.log(data);
					that.chatBoxEl.html( data );
					that.chatAutoScroll();
				}
			});
		},

		/*
		 * @method: chatAutoScroll
		 * add event listener to message form
		 */
		chatAutoScroll: function() {

			this.chatBoxEl.scrollTop( this.chatBoxEl[0].scrollHeight );
		}

	};


	chat.init();
	setInterval(function(){
		chat.loadLog();
	}, 1000);
	


}(jQuery);