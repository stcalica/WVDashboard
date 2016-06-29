(function(){
	'use strict';

	angular.module('core')
	.factory('d3',d3Service);

	d3Service.$inject = ['$document', '$q', '$rootScope'];

	function d3Service($document, $q, $rootScope){

		var deferred = $q.defer();

		var scriptTag = $document[0].createElement('script');
		scriptTag.type = 'text/javascript';
		scriptTag.async = true;
		scriptTag.src = "/lib/d3/d3.min.js";
		scriptTag.onreadystatechange = readyStateChanged;
		scriptTag.onload = onScriptLoad;

		var s = $document[0].getElementsByTagName('body')[0];
		s.appendChild(scriptTag);

		var factory = {
			d3: d3
		};

		return factory;

		function d3(){
			return deferred.promise;
		}

		function onScriptLoad(){
			$rootScope.$apply(function(){
				deferred.resolve(window.d3);
			});
		}

		function readyStateChanged(){
			if(scriptTag.readyState = 'complete'){
				onScriptLoad;
			}
		}
	};
})();
