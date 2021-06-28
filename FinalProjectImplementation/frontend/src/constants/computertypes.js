/* Global Object that contains constants */
const gamingPcDescription = "Personal computers are often used as gaming machines. " +
							"There is a whole community dedicated to PC gaming that " +
							"includes games that cannot be found on their console " +
							"counterparts. The biggest difference between a gaming " +
							"computer and a personal computer is a certain piece of " +
							"hardware called a graphics processing unit (GPU). This " +
							"handles the video output from a computer to the monitor " +
							"or TV that a user has. ";

const workstationPcDescription = "Workstation computers are extremely powerful machines " +
								"that have top of the line graphical capabilities. Extreme " +
								"consumers will build these types of machines to have the " +
								"absolute best machines possible for gaming and other applications " +
								"that use intense GPU power. What mostly distincts this computer " +
								"from a gaming computer is the type of graphics card inside the " +
								"machine. The Nvidia RTX 3090 is a prime example of a workstation " +
								"GPU.";

const everydayDescription = "Everyday computers are as the name suggests, one of the most basic " +
							"personal computers (PCs) that a consumer can purchase or build. " +
							"These computers are still built with the same parts as a gaming computer " +
							"or a workstation computer, but these are usually cheaper and  may " +
							"prioritize certain hardware pieces over others. For example, the GPU " +
							"of an everyday computer is not as vital to the machine as it is for " +
							"gaming and workstation computers. An everyday computer may prioritize the " +
							"processor or the storage space over the GPU to appeal to the everyday computer " +
							"over the gamer and the creator.";

const allInOneDescription = "All-in-one computers have all of their hardware components all in one unit, " +
							"as the name suggests. These types of computers are usually pre-built by a " +
							"computer manufacturer like Dell or Apple. Apple's desktop computer, the iMac, " +
							"is a prime example of an all in one computer. These types of computers can be " +
							"convenient as they take up less space and a separate purchase of a monitor is " +
							"not required.";

/******************************* Hardware Descriptions ************************************ */

const mboardDesc = `The motherboard is the component that holds everything up. It allows the other hardware 
					components to communicate with each other easily. Every hardware component is connected to 
					the motherboard with some sort of cable or direct connection. Many different kinds of 
					computers will have a main board. They can be quite large or very small. The motherboard
					for personal computers can be both a big board that will fit larger mid-sized towers
					and cases while there are smaller motherboards that can accomodate people interested in 
					making a smaller board. `;
const cpuDesc = `The Processor, or Central Processing Unit (CPU), is the brain of the computer. It provides 
					instructions and processing power for the computer to do all kinds of work. More processing
					power will lead to a faster computer and an overall better system. One of the most integral 
					components and worth spending a little more to keep your computer fast. `;
const ramDesc = `RAM stands for Random Access Memory. These memory sticks are a little different than one might
					think of when they hear the term memory. RAM is used in a multitude of applciations that need 
					to store data on a short term basis. These memory sticks store the information that your computer 
					is actively using at the moment. Someone who keeps a lot of programs running at one will want to 
					upgrade their RAM to a sizable amount.`;
const gpuDesc = `The Graphics Card, or Graphics Processing Unit (GPU), is the crown jewel for video game consumers and 
					computer graphics designers. This board has many cores that can compute simple mathematical calcuations 
					that assist in displaying visuals to a monitor or screen. This is essential for people who are looking to 
					play computer games with high graphical fidelity. `;
const storageDesc = `Most casual technologies will understand the idea of what storage is. Computer applications and files take 
						up memory space on a hard disk drive (HDD) or a solid state drive (SSD). The more space a hard drive or 
						SSD has, the more applications and files can be saved on that computer. Solid State Drives are becoming 
						standard in many machines. They have proven to be much faster than a hard disk drive, but hard drives have 
						become much cheaper because of this. A user that cares about having fast loading times in video games and 
						faster computer startups will want to invest in a SSD. `;
const powerDesc = `The Power Supply Unit, or commonly just referred as the power supply, is, as the name suggests, what powers all 
					the hardware components of the computer. Different kinds can be purchased based off the wattage the power supply 
					produces. A standard high end computer has historically been okay with a PSU with a 750 wattage, but that limit is
					getting pushed with each new generation of GPUs that are released into the market. A computer enthusiast and a 
					gamer looking to build a high end machine will want something higher than 750 watts to satisfy their needs. `;
const compcaseDesc = `The computer case is simply what keeps all the component inside a fortified enclosure. Without the case, 
						the computer would just be a board with different components attached to it in the wide open. 
						The case allows consumers to customize their build to something of their liking and keeps the hardware 
						organized inside. The case will also come with fans that allow the hot air generated by the machine to be 
						routed outside of the enclosure. `;
const heatsinkDesc = `The CPU Heatsink draws the heat generated by the processor and will have fans attached to that blow the hot air 
						outside of the case. When under a lot of stressful taks, the processor wil generate a lot of hot air that needs to 
						be dispelled away from it. The processor will usually come with a heat sink that attaches itself on top of the processor, 
						but sometimes purchasing a better heatsink is worth it. Liquid cooling has been very popular in recent history to give 
						the machine a cool water effect along with the most optimal temperatures. `;

var Constants = {
    GAMINGPCDESCRIPTION: gamingPcDescription,
    WORKSTATIONPCDESCRIPTION: workstationPcDescription,
    EVERYDAYDESCRIPTION: everydayDescription,
    ALLINONEDESCRIPTION: allInOneDescription,
	MOTHERBOARDDESCRIPTION: mboardDesc,
	CPUDESCRIPTION: cpuDesc,
	RAMDESCRIPTION: ramDesc,
	GPUDESCRIPTION: gpuDesc,
	STORAGEDESCRIPTION: storageDesc,
	PSUDESCRIPTION: powerDesc,
	CASEDESCRIPTION: compcaseDesc,
	HEATSINKDESCRIPTION: heatsinkDesc
};

export default Constants;