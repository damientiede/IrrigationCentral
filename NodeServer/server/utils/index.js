module.exports = {
    parseHardwareType(h)
    {    
        if (h == 0) { return 'GPIO';}
        if (h == 1) { return 'Distributed';}
        if (h == 2) { return 'SPI';}    
        return 'None';
    },
    parseDeviceState(s)
    {
        if(s==0) {return 'Standby';}
        if(s==1) {return 'Irrigating';}
        if(s==2) {return 'Fault';}
    },
    parseDeviceMode(m)
    {
        if(m==0) {return 'Auto';}
        if(m==1) {return 'Manual';}
        if(m==2) {return 'Diagnostic';}
    }
};