const SupplyStates =  {      INACTIVE: 0,      FALLING: 1,      LANDED: 2  };
const inactivePos = [0, -100000, 0]
const finalHeight = 0.5;
const fallTime = 3;
const dropHeightOffset = -1;

/**
 * MySupply
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySupply extends MyUnitCubeQuad {
	constructor(scene) {
        super(scene);
        this.deltaTime = 50;
        this.reset();
		this.initBuffers();
    }

    reset() {
        this.fallSpeed = 0;
        this.angle = 0;
        this.state = SupplyStates.INACTIVE;
        this.position = inactivePos;
    }
 
    drop(position, orientation) {
        this.angle = orientation;
        position[1] += dropHeightOffset;
        this.state = SupplyStates.FALLING;
        this.fallSpeed = (position[1] - finalHeight) / fallTime;
        this.position = position;
    }

    isAvailable() {
        return this.state == SupplyStates.INACTIVE;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(...this.position);
        this.scene.rotate(this.angle, 0, 1, 0);
        super.display();
        this.scene.popMatrix();
    }
    
    update(t) {
        this.deltaTime = t;

        if (this.state == SupplyStates.FALLING) {
            this.position[1] = Math.max(finalHeight, this.position[1] - this.fallSpeed * this.deltaTime);
            if (this.position[1] == finalHeight) {
                this.state = SupplyStates.LANDED;
            }
        }
    }

}