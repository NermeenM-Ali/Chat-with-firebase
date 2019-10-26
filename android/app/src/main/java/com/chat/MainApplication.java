package com.chat;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.imagepicker.ImagePickerPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import ui.toasty.RNToastyPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;

import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;                     
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;

import java.util.Arrays;
import java.util.List;


public class MainApplication extends NavigationApplication {

    @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                return "index";
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
            // eg. new VectorIconsPackage()
            new MainReactPackage(),
            new ImagePickerPackage(),
            new RNFetchBlobPackage(),
            new RNToastyPackage(),
            new PickerPackage(),
            new ReactNativeLocalizationPackage(),
            new ReactNativePushNotificationPackage(),
            new RNFirebasePackage(),
            new VectorIconsPackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseNotificationsPackage(),
            new RNFirebaseCrashlyticsPackage(),
            new RNFirebaseAuthPackage(),
            new RNFirebaseDatabasePackage(),
            new RNFirebaseStoragePackage(),
            new RNFirebaseAnalyticsPackage()
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

}


/*public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ //false);
  //}
//}*/
