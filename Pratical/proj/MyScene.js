/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.sphere = new MySphere(this, 16, 8);
        this.cilinder = new MyCilinder(this, 16);
        this.cubemap = new MyUnitCube(this);

        // Initialize textures (and appearances)
        this.earthTexture = new CGFtexture(this, "images/earth.jpg");
        this.earthAppearance = new CGFappearance(this);
        this.earthAppearance.setTexture(this.earthTexture);

        this.cubemapFilenames = [
            "images/skybox/cubemap.png",
            "images/skybox/sunset_cubemap.png",
            "images/skybox/bridge_cubemap.png",
            "images/skybox/underground_site_cubemap.png"
        ];
        this.cubemapTexture;
        
        // List for the Interface
        this.cubemapTextures = {
            "Skybox": 0,
            "Sunset": 1,
            "Bridge": 2,
            "Underground": 3
        }
        this.selectedCubemapTex = 0;

        this.cubemapAppearance = new CGFappearance(this);
        this.onSelectedCubemapTexture(0);

        //Objects connected to MyInterface
        this.displayAxis = true;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        //To be done...
    }

    onSelectedCubemapTexture(v) {
        this.cubemapTexture = new CGFtexture(this, this.cubemapFilenames[v]);
        this.cubemapAppearance.setTexture(this.cubemapTexture);
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

        // Cubemap
        this.pushMatrix();
        this.scale(50, 50, 50);
        this.cubemapAppearance.apply();
        this.cubemap.display();
        this.popMatrix();

        //This sphere does not have defined texture coordinates
        this.earthAppearance.apply();
        this.sphere.display();

        // this.cilinder.display();

        // ---- END Primitive drawing section
    }
}