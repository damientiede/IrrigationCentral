const Spi = require('../models').Spi;

module.exports = {
   seed() {
      Spi
	    .count()
	    .then(s => { 
	        if (s ==0) {
              Spi.create({
                    Name:'Test SPI 1',
                    Clock: 23,
                    CS:24,
                    MISO:21,
                    MOSI:19,
                    DeviceId:1
	      });
          console.log('Created 1 spi record');	   		
	   }
	})
   }
};
