import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../redux/actions/auth';
import { View } from 'react-native'

const Layout = ({ checkAuthenticated, load_user, children }) => {
    useEffect(() => {
        checkAuthenticated();
        load_user();
    }, []);

    return (
        <View>
            {children}
        </View>
    );
};

export default connect(null, { checkAuthenticated, load_user })(Layout);
