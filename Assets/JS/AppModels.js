function HomeViewModel() {
	this.title = "Home"	
	this.userName = ko.observable("empty");

}



function NavbarModel() {

}

function AssetModel() {
	this.photos = 
	ko.observableArray(
	[
		new Media(1, "UNSC Infinity", "The biggest most advanced ship", photosloc+"infinity.jpg", "Picture of chrysanthemum", "Marthyn Olthof", "20-02-2013", "image"),
		new Media(2, "UNSC Savannah", "This is a battleship", photosloc+"savannah.jpg", "Picture of chrysanthemum", "Marthyn Olthof", "20-02-2013", "image"),
		new Media(3, "UNSC Pillar of Autumn", "This is a carrier", photosloc+"fud.jpg", "Picture of hydrangeas", "Marthyn Olthof", "20-02-2013", "image"),
		new Media(4, "UNSC Forward unto Dawn", "Destroyed by the covenant", photosloc+"fud2.jpg", "Picture of Jellyfish", "Marthyn Olthof", "20-02-2013", "image"),
	]);

	this.setcurrentphoto = function(Media) {
		$("#popupPhotoLandscape").html(
		"<img src='"+Media.url+"' />");
	}

	this.setcurrentnote = function(Media) {
		$("#popupTextLandscape").html("<p>"+Media.text);
	}

	this.setDone = function(Media) {
		AssetModel.photos.remove(Media);
	}

	this.addPhoto = function(name, text, alt, author, date)
	{
		Assetmodel.photos.push(
			new Media(1, name, text, photosloc+name+".jpg", alt, author, date, "image"));
	}
}

var photosloc = "Assets/Dropbox/photo/";
var videosloc = "Assets/Dropbox/video/";
var textloc = "Assets/Dropbox/text/";
var voiceloc = "Assets/Dropbox/voice/";

function Media(id, name, text, url, alt, author, date, type) {
	this.id = id;
	this.name = name;
	this.text = text;
	this.url = url;
	this.alt = alt;
	this.author = author;
	this.date = date;
	this.type = type
}

var HomeViewModel = new HomeViewModel();
var AssetModel = new AssetModel();
console.log(AssetModel.photos);
ko.applyBindings(HomeViewModel);
ko.applyBindings(AssetModel);

